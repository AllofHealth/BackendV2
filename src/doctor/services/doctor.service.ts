import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../schema/doctor.schema';
import { Model, MongooseError } from 'mongoose';
import { DoctorDao } from '../dao/doctor.dao';
import {
  AddPatientPrescription,
  ApproveMedicalRecordAccessRequestType,
  CreateDoctorType,
  CreateMedicalRecordType,
  UpdateDoctorType,
} from '../interface/doctor.interface';
import { ApprovalStatus, Category, DoctorError } from 'src/shared';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from 'src/hospital/dao/hospital.dao';
import { PreviewType } from 'src/hospital/interface/hospital.interface';
import { PatientDao } from 'src/patient/dao/patient.dao';
import { PatientGuard } from 'src/patient/guards/patient.guard';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    private readonly doctorDao: DoctorDao,
    private readonly doctorGuard: DoctorGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly patientDao: PatientDao,
    private readonly patientGuard: PatientGuard,
  ) {}

  async getPendingDoctors() {
    try {
      const doctors = await this.doctorDao.fetchDoctorWithPendingStatus();
      if (!doctors) {
        return {
          success: HttpStatus.NOT_FOUND,
          doctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        doctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error fetching doctors');
    }
  }

  async getApprovedDoctors() {
    try {
      const doctors = await this.doctorDao.fetchDoctorWithApprovedStatus();
      if (!doctors) {
        return {
          success: HttpStatus.NOT_FOUND,
          doctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        doctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error fetching approved doctors');
    }
  }

  async createDoctor(args: CreateDoctorType) {
    const doctorExist = await this.doctorGuard.validateDoctorExists(
      args.walletAddress,
    );
    if (doctorExist) {
      return {
        success: HttpStatus.CREATED,
        message: 'Doctor already exists',
      };
    }

    if (
      await this.doctorGuard.validateDoctorExistsInHospital(
        args.hospitalIds as number,
        args.walletAddress,
      )
    ) {
      throw new DoctorError('Doctor already exists in hospital');
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      );

      if (!hospital) {
        throw new DoctorError("Hospital doesn't exist");
      }

      let doctor = await this.doctorDao.createNewDoctor(args);
      doctor = await this.doctorDao.fetchDoctorByAddress(args.walletAddress);

      try {
        doctor.hospitalIds.push(args.hospitalIds);
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        throw new Error('Error adding doctor');
      }

      const doctorPreview = {
        walletAddress: doctor.walletAddress,
        hospitalIds: doctor.hospitalIds,
        profilePicture: doctor.profilePicture,
        name: doctor.name,
        status: doctor.status,
        category: Category.Doctor,
      };

      try {
        hospital.doctors.push(doctorPreview as PreviewType);
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        throw new Error('Error adding doctor to hospital');
      }

      await doctor.save();
      await hospital.save();

      return {
        success: HttpStatus.OK,
        doctor,
        message: 'Doctor created successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError) {
        throw new MongooseError(error.message);
      }
      throw new DoctorError('Error creating doctor');
    }
  }

  async getDoctorByAddress(address: string) {
    if (!address || address.length !== 42) {
      throw new Error('Invalid address');
    }

    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(address);

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: "Doctor doesn't exist",
        };
      }

      return {
        success: HttpStatus.OK,
        doctor,
      };
    } catch (error) {
      console.error(error.message);
      throw new DoctorError('error fetching doctor by address');
    }
  }

  async getAllDoctors() {
    try {
      const allDoctors = await this.doctorDao.fetchAllDoctors();
      if (!allDoctors) {
        return {
          success: HttpStatus.FOUND,
          allDoctors: [],
        };
      }

      return {
        success: HttpStatus.OK,
        allDoctors,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new DoctorError('error fetching all doctors');
    }
  }

  async updateDoctor(walletAddress: string, args: UpdateDoctorType) {
    try {
      const doctorExist =
        await this.doctorGuard.validateDoctorExists(walletAddress);
      if (!doctorExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Doctor not found',
        };
      }

      const doctor = await this.doctorDao.updateDoctor(walletAddress, args);
      return {
        success: HttpStatus.OK,
        message: 'Doctor updated successfully',
        doctor,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new DoctorError('Error updating doctor');
    }
  }

  async deleteDoctorByAddress(address: string) {
    try {
      const doctorExist = await this.doctorGuard.validateDoctorExists(address);
      if (!doctorExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Doctor not found',
        };
      }
      const doctor = await this.doctorDao.fetchDoctorByAddress(address);
      const hospitalIds = doctor.hospitalIds;
      await this.hospitalDao.pullManyDoctors(hospitalIds, address);
      await this.doctorDao.deleteDoctor(address);
      return {
        success: HttpStatus.OK,
        message: 'Doctor deleted successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new InternalServerErrorException('Error deleting doctor');
    }
  }

  async createPrescription(args: AddPatientPrescription) {
    const {
      recordId,
      patientAddress,
      doctorAddress,
      medicineName,
      medicineId,
      medicineGroup,
      description,
      sideEffects,
    } = args;
    try {
      const isPatient = await this.patientGuard.validatePatient(patientAddress);
      const isDoctor =
        await this.doctorGuard.validateDoctorExists(doctorAddress);

      if (!isPatient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }

      if (!isDoctor) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: 'unauthorized',
        };
      }

      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);

      if (doctor.status !== ApprovalStatus.Approved) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: 'doctor not approved',
        };
      }

      const newPrescriptionArgs = {
        doctorName: doctor.name,
        recordId: recordId,
        patientAddress: patientAddress,
        doctorAddress: doctorAddress,
        medicineName: medicineName,
        medicineId: medicineId,
        medicineGroup: medicineGroup,
        description: description,
        sideEffects: sideEffects,
      };

      const prescription =
        await this.patientDao.createPrescription(newPrescriptionArgs);
      patient.prescriptions.push(prescription);

      await patient.save();

      return {
        success: HttpStatus.OK,
        message: 'Prescription created successfully',
      };
    } catch (error) {
      console.error(error);
      throw new DoctorError('Error creating prescription');
    }
  }

  async approveMedicalRecordAccessRequest(
    args: ApproveMedicalRecordAccessRequestType,
  ) {
    const { patientAddress, doctorAddress, id } = args;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);

      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'patient not found',
        };
      }

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor not found',
        };
      }

      if (!doctor.activeApprovals.length) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'no pending approvals',
        };
      }

      const request = doctor.activeApprovals.find(
        (approval) => approval._id == id,
      );

      if (!request) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'approval request not found',
        };
      }

      if (request.approvalStatus === ApprovalStatus.Approved) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'approval request already approved',
        };
      }

      request.approvalStatus = ApprovalStatus.Approved;
      patient.appointmentCount++;

      await patient.save();
      await doctor.save();

      return {
        success: HttpStatus.OK,
        message: 'Record access request accepted',
      };
    } catch (error) {
      console.error(error);
      throw new DoctorError(
        'An error occurred while approving record access request',
      );
    }
  }

  async fetchAllActiveApprovals(doctorAddress: string) {
    try {
      const isDoctor =
        await this.doctorGuard.validateDoctorExists(doctorAddress);

      if (!isDoctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Doctor not found',
        };
      }

      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      const approvals = doctor.activeApprovals;

      if (!approvals.length) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'No active approvals',
        };
      }

      return {
        success: HttpStatus.OK,
        approvals,
      };
    } catch (error) {
      console.error(error);
      throw new DoctorError(
        'An error occurred while fetching all active approvals',
      );
    }
  }

  async rejectMedicalRecordAccessRequest(
    args: ApproveMedicalRecordAccessRequestType,
  ) {
    const { patientAddress, doctorAddress, id } = args;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);

      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'patient not found',
        };
      }

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor not found',
        };
      }

      if (!doctor.activeApprovals.length) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'no pending approvals',
        };
      }

      const request = doctor.activeApprovals.find(
        (approval) => approval._id == id,
      );

      if (!request) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'approval request not found',
        };
      }

      await this.patientDao.pullOneApproval(doctorAddress, patientAddress, id);

      return {
        success: HttpStatus.OK,
        message: 'Record access request rejected',
      };
    } catch (error) {
      console.error(error);
    }
  }

  async createMedicalRecord(args: CreateMedicalRecordType) {
    const { recordId, principalPatientAddress, doctorAddress, diagnosis } =
      args;
    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        doctor.hospitalIds[0],
      );
      const patient = await this.patientDao.fetchPatientByAddress(
        principalPatientAddress,
      );

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor not found',
        };
      }

      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor is not associated with any hospital',
        };
      }

      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'patient not found',
        };
      }

      const approvalRequest = doctor.activeApprovals.find(
        (approval) => approval.recordOwner == principalPatientAddress,
      );

      if (!approvalRequest) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'approval request not found',
        };
      }

      if (approvalRequest.approvalStatus !== ApprovalStatus.Approved) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'approval request not approved, accept the approval first',
        };
      }

      const currentTime = new Date();
      if (currentTime > approvalRequest.approvalDuration) {
        try {
          await this.patientDao.pullOneApproval(
            doctorAddress,
            principalPatientAddress,
            approvalRequest._id,
          );
          return {
            success: HttpStatus.BAD_REQUEST,
            message: 'approval request expired, removed request',
          };
        } catch (error) {
          console.error(error);
          return {
            success: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An error occurred while removing approval request',
          };
        }
      }
      const medicalRecord = await this.patientDao.createMedicalRecordPreview({
        recordId,
        principalPatientAddress,
        doctorAddress,
        diagnosis,
        doctorsName: doctor.name,
        hospitalName: hospital.name,
      });

      patient.medicalRecords.push(medicalRecord);
      await patient.save();

      await this.patientDao.pullPatientApprovals(
        doctorAddress,
        principalPatientAddress,
      );
      return {
        success: HttpStatus.OK,
        message: 'Medical record created',
      };
    } catch (error) {
      console.error(error);
      throw new DoctorError('An error occurred while creating medical record');
    }
  }

  async deleteAllApprovalRequests(walletAddress: string) {
    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor not found',
        };
      }

      doctor.activeApprovals = [];
      await doctor.save();
    } catch (error) {
      console.error(error);
      throw new DoctorError(
        'An error occurred while deleting all approval requests',
      );
    }
  }
}
