import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongooseError, Types } from 'mongoose';
import { DoctorDao } from '../dao/doctor.dao';
import {
  AddMedicineType,
  AddPatientPrescription,
  ApproveMedicalRecordAccessRequestType,
  CreateDoctorType,
  CreateMedicalRecordType,
  DoctorType,
  UpdateDoctorType,
} from '../interface/doctor.interface';
import { ApprovalStatus, Category, DoctorError } from '@/shared';
import { DoctorGuard } from '../guards/doctor.guard';
import { HospitalDao } from '@/modules/hospital/dao/hospital.dao';
import { PreviewType } from '@/modules/hospital/interface/hospital.interface';
import { PatientDao } from '@/modules/patient/dao/patient.dao';
import { PatientGuard } from '@/modules/patient/guards/patient.guard';
import { MedicineDao } from '@/modules/medicine/dao/medicine.dao';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SharedEvents } from '@/shared/events/shared.events';
import { EntityCreatedDto } from '@/shared/dto/shared.dto';

@Injectable()
export class DoctorService {
  private readonly logger = new MyLoggerService('DoctorService');

  constructor(
    private readonly doctorDao: DoctorDao,
    private readonly doctorGuard: DoctorGuard,
    private readonly hospitalDao: HospitalDao,
    private readonly patientDao: PatientDao,
    private readonly patientGuard: PatientGuard,
    private readonly medicineDao: MedicineDao,
    private readonly eventEmitter: EventEmitter2,
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
      return {
        success: HttpStatus.BAD_REQUEST,
        message: 'Doctor already exists in hospital',
      };
    }

    try {
      const hospital = await this.hospitalDao.fetchHospitalWithBlockchainId(
        args.hospitalIds as number,
      );

      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Hospital not found',
        };
      }

      const doctor = await this.doctorDao.createNewDoctor(args);

      if (args.walletAddress === hospital.admin) {
        doctor.status = ApprovalStatus.Approved;
        await doctor.save();
      }

      try {
        doctor.hospitalIds.push(args.hospitalIds);
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        throw new Error('Error adding doctor');
      }

      const doctorPreview = {
        id: doctor.id,
        walletAddress: doctor.walletAddress,
        hospitalIds: doctor.hospitalIds,
        profilePicture: doctor.profilePicture,
        name: doctor.name,
        status: doctor.status,
        category: Category.Doctor,
      } as PreviewType;

      try {
        hospital.doctors.push(doctorPreview);
        this.eventEmitter.emit(
          SharedEvents.ENTITY_CREATED,
          new EntityCreatedDto(args.walletAddress, doctor.email, 'doctor'),
        );
      } catch (error) {
        await this.doctorDao.deleteDoctor(args.walletAddress);
        return {
          success: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error adding doctor to hospital',
        };
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
      const hospitalName = await this.hospitalDao
        .fetchHospitalWithBlockchainId(doctor.hospitalIds[0])
        .then((hospital) => hospital.name);

      const doctorData: DoctorType = {
        _id: doctor._id,
        id: doctor.id,
        hospitalIds: doctor.hospitalIds,
        name: doctor.name,
        email: doctor.email,
        profilePicture: doctor.profilePicture,
        specialty: doctor.specialty,
        location: doctor.location,
        phoneNumber: doctor.phoneNumber,
        walletAddress: doctor.walletAddress,
        numberOfApprovals: doctor.numberOfApprovals,
        status: doctor.status,
        category: doctor.category,
        isVerified: doctor.isVerified,
        activeApprovals: doctor.activeApprovals,
      };

      const data = {
        hospitalName,
        ...doctorData,
      };
      return {
        success: HttpStatus.OK,
        doctor: data,
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

  private async addMedication(args: AddMedicineType) {
    try {
      const medication = await this.medicineDao.createMedicine(args);
      if (!medication) {
        throw new HttpException(
          { message: 'An error occurred creating a new medication' },
          HttpStatus.BAD_REQUEST,
        );
      }

      return medication;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        { message: 'An error occurred while adding medication' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPrescription(args: AddPatientPrescription) {
    const { recordId, patientAddress, doctorAddress, medicine } = args;
    try {
      const isPatient = await this.patientGuard.validatePatient(patientAddress);

      if (!isPatient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }

      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      const hospitalId = doctor.hospitalIds[0];

      const institution =
        await this.hospitalDao.fetchHospitalWithBlockchainId(hospitalId);

      if (!institution) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Hospital not found',
        };
      }

      const medicationPromises = medicine.map(async (med) => {
        return await this.addMedication(med);
      });

      const medication = await Promise.all(medicationPromises);
      console.log(medication);

      const newPrescriptionArgs = {
        recordId: recordId,
        doctorName: doctor.name,
        doctorAddress: doctorAddress,
        institutionName: institution.name,
        patientName: patient.name,
        patientAddress: patientAddress,
        medicine: medication,
      };
      this.logger.log(medication);
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
            approvalRequest._id as Types.ObjectId,
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

      if (approvalRequest.recordTag === 'familyMember') {
        const familyMember = patient.familyMembers.find(
          (member) => member.id === approvalRequest.patientId,
        );
        if (!familyMember) {
          return {
            success: HttpStatus.NOT_FOUND,
            message: 'family member not found',
          };
        }

        const familyMemberSchema =
          await this.patientDao.fetchPatientFamilyMember(
            principalPatientAddress,
            approvalRequest.patientId,
          );
        if (!familyMember) {
          return {
            success: HttpStatus.NOT_FOUND,
            message: 'family member not found',
          };
        }

        familyMemberSchema.medicalRecord.push(medicalRecord);
        await familyMemberSchema.save();

        familyMember.medicalRecord.push(medicalRecord);
        await patient.save();
      } else if (approvalRequest.recordTag === 'patient') {
        patient.medicalRecords.push(medicalRecord);
        await patient.save();
      }

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

      return {
        success: HttpStatus.OK,
        message: 'All approval requests deleted',
      };
    } catch (error) {
      console.error(error);
      throw new DoctorError(
        'An error occurred while deleting all approval requests',
      );
    }
  }

  async swapId(walletAddress: string, id: number) {
    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
      doctor.id = id;
      await doctor.save();

      return {
        success: HttpStatus.OK,
        message: 'swapped id successfully',
      };
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(
        'an error occurred while swapping id',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}