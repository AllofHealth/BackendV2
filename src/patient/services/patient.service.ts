import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Patient } from '../schemas/patient.schema';
import {
  CreateFamilyMemberType,
  CreatePatientType,
  UpdateFamilyMemberType,
  UpdatePatientProfileType,
} from '../interface/patient.interface';
import { ErrorCodes, PatientError } from 'src/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { PatientDao } from '../dao/patient.dao';
import { PatientGuard } from '../guards/patient.guard';

/**
 * @file: Patient Service
 * @author: 3illbaby
 */
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    private readonly patientDao: PatientDao,
    private readonly patientGuard: PatientGuard,
  ) {}

  async createNewPatient(args: CreatePatientType) {
    const {
      id,
      name,
      age,
      address,
      city,
      walletAddress,
      bloodGroup,
      genotype,
    } = args;
    if (
      !Number.isInteger(id) ||
      id <= 0 ||
      !Number.isInteger(age) ||
      age <= 0 ||
      !name ||
      !address ||
      !city ||
      !walletAddress ||
      walletAddress.length !== 42 ||
      !bloodGroup ||
      !genotype
    ) {
      throw new PatientError('Invalid parameter');
    }
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);
      if (patientExist) {
        return {
          success: HttpStatus.CREATED,
          message: 'patient already exist',
        };
      }
      const patient = await this.patientDao.createNewPatient(args);
      console.info(patient);
      return {
        success: ErrorCodes.Success,
        patient,
        message: 'Patient created successfully',
      };
    } catch (error) {
      Logger.error(error);
      throw new PatientError('An error occurred while creating patient');
    }
  }

  async addFamilyMember(args: {
    walletAddress: string;
    familyMember: CreateFamilyMemberType;
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

      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'patient not found',
        };
      }

      const sanitizeRelationship = relationship.toLowerCase();
      const sanitizedArgs = {
        id,
        principalPatient: walletAddress,
        name,
        relationship: sanitizeRelationship,
        email,
        address,
        age,
        dob,
        bloodGroup,
        genotype,
      };
      const familyMemberExist = patient.familyMembers.find(
        (member) => member.id === id,
      );

      if (familyMemberExist) {
        return {
          success: HttpStatus.CONFLICT,
          message: 'family member already exist',
        };
      }

      const newFamilyMember =
        await this.patientDao.returnFamilyMembers(sanitizedArgs);
      patient.familyMembers.push(newFamilyMember);
      await patient.save();
      return {
        success: HttpStatus.OK,
        message: 'Family member added successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PatientError('An error occurred while adding family member');
    }
  }

  async listFamilyMember(walletAddress: string) {
    try {
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      if (!patient) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }
      const familyMembers = patient.familyMembers;
      if (!familyMembers) {
        return {
          success: HttpStatus.FOUND,
          members: [],
          message: 'No family members added',
        };
      }
      return {
        success: HttpStatus.FOUND,
        members: familyMembers,
        message: 'Family members found',
      };
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while listing family member');
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
          message: 'Patient not found',
        };
      }
      const familyMember = patient.familyMembers;
      const member = familyMember.find((member) => member.id === memberId);
      if (!member) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Member not found',
        };
      }

      return {
        success: HttpStatus.OK,
        member,
      };
    } catch (error) {
      console.error(error);
      throw new PatientError('an error occurred while fetching family member');
    }
  }

  async editFamilyMember(args: {
    walletAddress: string;
    familyMemberId: number;
    updateData: UpdateFamilyMemberType;
  }) {
    const { walletAddress, familyMemberId, updateData } = args;
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);
      if (!patientExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }

      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);

      const familyMemberExists = patient.familyMembers.find(
        (member) => member.id === familyMemberId,
      );

      if (!familyMemberExists) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Family member not found',
        };
      }

      const familyMember = await this.patientDao.updateFamilyMember(
        walletAddress,
        familyMemberId,
        updateData,
      );

      return {
        success: HttpStatus.OK,
        message: 'Family member updated successfully',
        familyMember,
      };
    } catch (error) {
      console.error(error);
      throw new PatientError('An error occurred while editing family member');
    }
  }

  async findAllPatients() {
    return await this.patientModel.find();
  }

  async fetchPatientByWalletAddress(walletAddress: string) {
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);

      if (!patientExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }
      const patient =
        await this.patientDao.fetchPatientByAddress(walletAddress);
      return {
        success: ErrorCodes.Success,
        patient,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PatientError('An error occurred while fetching patient');
    }
  }

  async updatePatient(walletAddress: string, args: UpdatePatientProfileType) {
    try {
      const patientExist =
        await this.patientGuard.validatePatient(walletAddress);
      if (!patientExist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }
      const patient = await this.patientDao.updatePatient(walletAddress, args);
      return {
        success: HttpStatus.OK,
        message: 'Patient updated successfully',
        patient,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new PatientError('An error occurred while updating patient');
    }
  }

  async deletePatientByAddress(walletAddress: string) {
    try {
      const patientExists =
        await this.patientGuard.validatePatient(walletAddress);
      if (!patientExists) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'Patient not found',
        };
      }
      await this.patientModel.deleteOne({ walletAddress });
      return {
        success: HttpStatus.OK,
        message: 'Patient deleted successfully',
      };
    } catch (error) {
      console.error(error);
      throw new PatientError('An error occurred while deleting patient');
    }
  }
}
