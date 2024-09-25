import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from '../schemas/patient.schema';
import {
  ApprovalType,
  IApprovalInput,
  ICreateApproval,
  ICreateApprovalInput,
  ICreatePatient,
  IFamilyMember,
  IFamilyMemberApprovalInput,
  ISharePrescription,
  IUpdateFamilyMember,
  IUpdatePatientProfile,
} from '../interface/patient.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';
import { PatientGuard } from '../guards/patient.guard';
import { PharmacistGuard } from '@/modules/pharmacist/guards/pharmacist.guard';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PatientProvider } from '../provider/patient.provider';
import { PROFILE_PLACEHOLDER } from '@/shared/constants';
import { OtpService } from '@/modules/otp/services/otp.service';
import { ApprovalStatus, PatientError } from '@/shared';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import {
  PatientErrors,
  PatientSuccess,
} from '@/modules/patient/data/patient.data';

/**
 * @file: Patient Service
 * @author: 3illbaby
 */
@Injectable()
export class PatientService {
  private readonly logger = new MyLoggerService(PatientService.name);
  private provider = PatientProvider.useFactory();

  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly patientDao: PatientDao,
    private readonly patientGuard: PatientGuard,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly pharmacistDao: PharmacistDao,
    private readonly doctorDao: DoctorDao,
    private readonly otpService: OtpService,
  ) {}

  private getApprovalType(approvalType: string): string {
    const upperCaseType = approvalType.toUpperCase();
    if (upperCaseType === ApprovalType.FULL) {
      return ApprovalType.FULL;
    } else if (upperCaseType === ApprovalType.READ) {
      return ApprovalType.READ;
    }
    throw new PatientError('Invalid approval type');
  }

  private createApprovalInputs(args: ICreateApprovalInput): ICreateApproval[] {
    const {
      id,
      name,
      recordIds,
      profilePicture,
      approvalType,
      approvalDuration,
      recordOwner,
      recordTag,
    } = args;

    if (recordIds && recordIds.length > 0) {
      return recordIds.map((recordId) => ({
        patientId: id,
        patientName: name,
        recordId,
        profilePicture: profilePicture,
        approvalType,
        approvalStatus: ApprovalStatus.Pending,
        approvalDuration,
        recordOwner,
        recordTag: recordTag,
      }));
    } else {
      return [
        {
          patientId: id,
          patientName: name,
          recordId: 0,
          profilePicture: profilePicture,
          approvalType,
          approvalStatus: ApprovalStatus.Pending,
          approvalDuration,
          recordOwner,
          recordTag: recordTag,
        },
      ];
    }
  }

  async createNewPatient(args: ICreatePatient) {
    const { walletAddress } = args;

    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);
      if (patientExist) {
        return {
          success: HttpStatus.CREATED,
          message: PatientErrors.PATIENT_EXISTS,
        };
      }
      const patient = await this.patientDao.createNewPatient(args);
      if (!patient) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: PatientErrors.PATIENT_CREATED_ERROR,
        };
      }

      try {
        await this.otpService.deliverOtp(walletAddress, args.email, 'patient');
        this.logger.info(
          `email successfully sent on patient creation to ${args.email}`,
        );
      } catch (e) {
        this.logger.log(e.message);
        throw new HttpException(
          { message: PatientErrors.PATIENT_CREATED_ERROR },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        success: HttpStatus.OK,
        message: PatientSuccess.PATIENT_CREATED,
        patient,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.PATIENT_CREATED_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addFamilyMember(args: {
    walletAddress: string;
    familyMember: IFamilyMember;
  }) {
    const { walletAddress, familyMember } = args;
    const {
      id,
      name,
      relationship,
      email,
      address,
      age,
      dob,
      bloodGroup,
      genotype,
    } = familyMember;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);

      const sanitizeRelationship = relationship.toLowerCase();
      const sanitizedArgs = {
        id,
        principalPatient: walletAddress,
        name,
        relationship: sanitizeRelationship,
        email,
        address,
        age,
        dob: new Date(dob),
        bloodGroup,
        genotype,
      };
      const familyMemberExist = patient.familyMembers.find(
        (member) => member.id === id,
      );

      if (familyMemberExist) {
        return {
          success: HttpStatus.CONFLICT,
          message: PatientErrors.FAMILY_MEMBER_EXIST,
        };
      }

      const newFamilyMember =
        await this.patientDao.createFamilyMembers(sanitizedArgs);
      patient.familyMembers.push(newFamilyMember);
      await patient.save();
      return {
        success: HttpStatus.OK,
        message: PatientSuccess.FAMILY_MEMBER_ADDED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FAMILY_MEMBER_ERROR },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listFamilyMember(walletAddress: string) {
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      const familyMembers = patient.familyMembers;
      if (!familyMembers) {
        return {
          success: HttpStatus.FOUND,
          message: PatientErrors.FAMILY_MEMBER_LIST_ERROR,
          members: [],
        };
      }
      return {
        success: HttpStatus.OK,
        message: PatientSuccess.FAMILY_MEMBER_FOUND,
        members: familyMembers,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FAMILY_MEMBER_FETCH_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFamilyMemberById(args: { walletAddress: string; memberId: number }) {
    const { walletAddress, memberId } = args;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.PATIENT_NOT_FOUND,
        };
      }
      const familyMember = patient.familyMembers;
      const member = familyMember.find((member) => member.id === memberId);
      if (!member) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.FAMILY_MEMBER_LIST_ERROR,
        };
      }

      return {
        success: HttpStatus.OK,
        member,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FAMILY_MEMBER_FETCH_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editFamilyMember(args: {
    walletAddress: string;
    familyMemberId: number;
    updateData: IUpdateFamilyMember;
  }) {
    const { walletAddress, familyMemberId, updateData } = args;
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);

      const familyMemberExists = patient.familyMembers.find(
        (member) => member.id === familyMemberId,
      );

      if (!familyMemberExists) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.FAMILY_MEMBER_NOT_FOUND,
        };
      }

      const familyMember = await this.patientDao.updateFamilyMember(
        walletAddress,
        familyMemberId,
        updateData,
      );

      return {
        success: HttpStatus.OK,
        message: PatientSuccess.FAMILY_MEMBER_UPDATED,
        familyMember,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FAMILY_MEMBER_UPDATE_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllPatients() {
    try {
      const patients = await this.patientModel.find();
      if (!patients) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: PatientErrors.PATIENT_NOT_FOUND,
          data: [],
        };
      }

      return {
        status: HttpStatus.OK,
        patients,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.PATIENT_FETCH_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchPatientByWalletAddress(walletAddress: string) {
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);

      if (!patientExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.PATIENT_NOT_FOUND,
        };
      }
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      return {
        success: HttpStatus.OK,
        patient,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.PATIENT_FETCH_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePatient(walletAddress: string, args: IUpdatePatientProfile) {
    try {
      await this.patientDao.updatePatient(walletAddress, args);
      return {
        success: HttpStatus.OK,
        message: PatientSuccess.PATIENT_UPDATED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.PATIENT_UPDATE_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePatientByAddress(walletAddress: string) {
    try {
      const patientExists =
        await this.patientGuard.validatePatient(walletAddress);
      if (!patientExists) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.PATIENT_NOT_FOUND,
        };
      }
      await this.patientDao.DeletePatient(walletAddress);
      return {
        success: HttpStatus.OK,
        message: PatientSuccess.PATIENT_DELETED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.PATIENT_DELETE_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllPrescriptions(walletAddress: string) {
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);

      const prescriptions = patient.prescriptions;

      return {
        success: HttpStatus.OK,
        prescriptions,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FETCH_PRESCRIPTION_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchPrescription(
    walletAddress: string,
    prescriptionId: Types.ObjectId,
  ) {
    try {
      const prescription = await this.patientModel.findOne(
        { walletAddress, 'prescriptions._id': prescriptionId },
        { 'prescriptions.$': 1 },
      );

      if (!prescription || !prescription.prescriptions.length) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: `${PatientErrors.PRESCRIPTION_NOT_FOUND} | ${PatientErrors.INVALID_PRESCRIPTION_ID}`,
        };
      }

      return {
        success: HttpStatus.OK,
        prescription: prescription.prescriptions[0],
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FETCH_PRESCRIPTION_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sharePrescription(args: ISharePrescription) {
    const { walletAddress, pharmacistAddress, prescriptionId } = args;
    try {
      const isPharmacist =
        await this.pharmacistGuard.validatePharmacistExists(pharmacistAddress);
      if (!isPharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.PHARMACIST_NOT_FOUND,
        };
      }

      const prescription = await this.patientModel.findOne(
        { walletAddress, 'prescriptions._id': prescriptionId },
        { 'prescriptions.$': 1 },
      );

      if (!prescription || !prescription.prescriptions.length) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: `${PatientErrors.PRESCRIPTION_NOT_FOUND} | ${PatientErrors.INVALID_PRESCRIPTION_ID}`,
        };
      }

      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
      try {
        pharmacist.sharedPrescriptions.push(prescription.prescriptions[0]);
        await pharmacist.save();
      } catch (error) {
        return {
          success: HttpStatus.INTERNAL_SERVER_ERROR,
          message: PatientErrors.SHARE_PRESCRIPTION_ERROR,
        };
      }

      return {
        success: HttpStatus.OK,
        message: PatientSuccess.PRESCRIPTION_SHARED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.SHARE_PRESCRIPTION_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePrescriptions(
    walletAddress: string,
    prescriptionId: Types.ObjectId,
  ) {
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);

      const prescription = patient.prescriptions.find(
        (prescription) => prescription._id == prescriptionId,
      );
      if (!prescription) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.PRESCRIPTION_NOT_FOUND,
        };
      }

      await this.patientDao.pullOnePrescription(prescriptionId, walletAddress);
      await this.patientDao.deletePrescription(prescriptionId);
      await patient.save();

      return {
        success: HttpStatus.OK,
        message: PatientSuccess.PRESCRIPTION_DELETED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.DELETE_PRESCRIPTION_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approveMedicalRecordAccess(args: IApprovalInput) {
    const {
      recordId,
      patientAddress,
      doctorAddress,
      approvalType,
      approvalDurationInSecs,
    } = args;

    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(patientAddress);

      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.DOCTOR_NOT_FOUND,
        };
      }

      if (doctor.status !== ApprovalStatus.Approved) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: PatientErrors.DOCTOR_NOT_APPROVED,
        };
      }

      const sanitizedApprovalType = this.getApprovalType(approvalType);
      const durationTime = this.provider.returnDuration(approvalDurationInSecs);

      const approvalInputs = this.createApprovalInputs({
        id: patient.id,
        name: patient.name,
        recordIds: recordId,
        profilePicture: patient.profilePicture,
        approvalType: sanitizedApprovalType,
        approvalDuration: durationTime,
        recordOwner: patient.walletAddress,
        recordTag: 'patient',
      });

      const approvals = await Promise.all(
        approvalInputs.map((input) => this.patientDao.createApproval(input)),
      );

      doctor.activeApprovals.push(...approvals);
      doctor.numberOfApprovals += approvals.length;
      await doctor.save();

      return {
        success: HttpStatus.OK,
        message: PatientSuccess.MEDICAL_RECORD_ACCESS_APPROVED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.APPROVE_MEDICAL_RECORD_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approveMedicalRecordAccessForFamilyMember(
    args: IFamilyMemberApprovalInput,
  ) {
    const {
      recordId,
      familyMemberId,
      patientAddress,
      doctorAddress,
      approvalType,
      approvalDurationInSecs,
    } = args;
    try {
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.DOCTOR_NOT_FOUND,
        };
      }

      if (doctor.status !== ApprovalStatus.Approved) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: PatientErrors.DOCTOR_NOT_APPROVED,
        };
      }

      const familyMember = await this.patientDao.fetchPatientFamilyMember(
        patientAddress,
        familyMemberId,
      );

      if (!familyMember) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.FAMILY_MEMBER_NOT_FOUND,
        };
      }

      if (familyMember.principalPatient != patientAddress) {
        return {
          success: HttpStatus.UNAUTHORIZED,
          message: PatientErrors.INVALID_PRINCIPAL_PATIENT,
        };
      }

      const sanitizedApprovalType = this.getApprovalType(approvalType);
      const durationTime = this.provider.returnDuration(approvalDurationInSecs);

      const approvalInputs = this.createApprovalInputs({
        id: familyMember.id,
        name: familyMember.name,
        recordIds: recordId,
        profilePicture: PROFILE_PLACEHOLDER,
        approvalType: sanitizedApprovalType,
        approvalDuration: durationTime,
        recordOwner: familyMember.principalPatient,
        recordTag: 'familyMember',
      });

      const approvals = await Promise.all(
        approvalInputs.map((input) => this.patientDao.createApproval(input)),
      );

      doctor.activeApprovals = doctor.activeApprovals.concat(approvals);
      doctor.numberOfApprovals += approvals.length;
      await doctor.save();

      return {
        success: HttpStatus.OK,
        message: PatientSuccess.FAMILY_MEDICAL_RECORD_ACCESS_APPROVED,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.APPROVE_MEDICAL_RECORD_FAMILY },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllMedicalRecords(patientAddress: string) {
    try {
      const patient = await this.fetchPatientByWalletAddress(patientAddress);

      const medicalRecords = patient.patient.medicalRecords;
      if (!medicalRecords) {
        return {
          success: HttpStatus.OK,
          medicalRecords: [],
        };
      }

      return {
        success: HttpStatus.OK,
        medicalRecords,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FETCH_MEDICAL_RECORD_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchAllMedicalRecordsForFamilyMember(args: {
    principalPatientAddress: string;
    familyMemberId: number;
  }) {
    const { principalPatientAddress, familyMemberId } = args;
    try {
      const patient = await this.patientDao.fetchPatientByAddress(
        principalPatientAddress,
      );

      const familyMember = patient.familyMembers.find(
        (member) => member.id === familyMemberId,
      );

      if (!familyMember) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.FAMILY_MEMBER_NOT_FOUND,
        };
      }

      const records = familyMember.medicalRecord;

      return {
        success: HttpStatus.OK,
        records,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.FETCH_FAMILY_MEDICAL_RECORD },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchMedicalRecordById(args: {
    walletAddress: string;
    recordId: number;
  }) {
    const { walletAddress, recordId } = args;
    try {
      const record = await this.patientDao.findOneRecord(
        walletAddress,
        recordId,
      );
      if (!record) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: PatientErrors.RECORD_NOT_FOUND,
        };
      }

      return {
        success: HttpStatus.OK,
        record,
      };
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(
        { message: PatientErrors.RECORD_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
