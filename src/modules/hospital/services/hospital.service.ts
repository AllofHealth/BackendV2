import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Hospital } from '../schema/hospital.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError, Types } from 'mongoose';
import {
  ApprovePractitionerType,
  CreateHospitalType,
  HospitalType,
  IPurgePractitioner,
  JoinHospitalType,
  PreviewType,
  RemovePractitionerType,
  UpdateHospitalProfileType,
} from '../interface/hospital.interface';
import { ApprovalStatus, ErrorCodes, HospitalError } from '@/shared';
import { MyLoggerService } from '@/modules/my-logger/my-logger.service';
import { HospitalDao } from '../dao/hospital.dao';
import { DoctorDao } from '@/modules/doctor/dao/doctor.dao';
import { PharmacistDao } from '@/modules/pharmacist/dao/pharmacist.dao';
import { DoctorGuard } from '@/modules/doctor/guards/doctor.guard';
import { PharmacistGuard } from '@/modules/pharmacist/guards/pharmacist.guard';
import { EncryptionService } from '@/shared/utils/encryption/service/encryption.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SharedEvents } from '@/shared/events/shared.events';
import { EntityCreatedDto } from '@/shared/dto/shared.dto';

@Injectable()
export class HospitalService {
  private logger: MyLoggerService = new MyLoggerService('HospitalService');

  constructor(
    @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
    private readonly hospitalDao: HospitalDao,
    private readonly doctorDao: DoctorDao,
    private readonly pharmacistDao: PharmacistDao,
    private readonly doctorGuard: DoctorGuard,
    private readonly pharmacistGuard: PharmacistGuard,
    private readonly eventEmitter: EventEmitter2,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createNewHospital(args: CreateHospitalType) {
    const { regNo, ...rest } = args;

    try {
      const hospitalExist =
        await this.hospitalDao.fetchHospitalWithBlockchainId(args.id);
      if (hospitalExist) {
        return {
          success: HttpStatus.CREATED,
          message: 'hospital already exists',
        };
      }

      const hospitalData: CreateHospitalType = {
        ...rest,
        regNo: this.encryptionService.encrypt({ data: regNo }),
      };

      const hospital = await this.hospitalDao.createHospital(hospitalData);
      if (!hospital) {
        return {
          success: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error creating hospital',
        };
      }

      try {
        this.eventEmitter.emit(
          SharedEvents.ENTITY_CREATED,
          new EntityCreatedDto(args.admin, hospital.email, 'institution'),
        );
      } catch (error) {
        await this.hospitalDao.removeHospitalById(hospital._id);
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'An error occurred while creating institution',
        };
      }
      return {
        success: ErrorCodes.Success,
        hospital,
        message: 'Hospital created successfully',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new HospitalError(error.message);
      throw new InternalServerErrorException('Error creating hospital');
    }
  }

  async removeDoctorFromHospital(
    hospitalId: Types.ObjectId,
    doctorAddress: string,
  ) {
    try {
      await this.hospitalDao.pullOneDoctor(hospitalId, doctorAddress);
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing doctor');
    }
  }

  async removeHospitalIdFromDoctorDocument(args: {
    hospitalId: Types.ObjectId;
    doctorAddress: string;
  }) {
    const { hospitalId, doctorAddress } = args;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'hospital not found',
        };
      }

      if (!doctor) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'doctor not found',
        };
      }
      doctor.hospitalIds.splice(doctor.hospitalIds.indexOf(hospital.id), 1);
      if (doctor.hospitalIds.length === 0) {
        doctor.status = ApprovalStatus.Pending;
        doctor.hospitalIds = [];
      }

      await doctor.save();
    } catch (error) {
      console.error(error);
      throw new HospitalError(
        'Error removing hospital id from doctor document',
      );
    }
  }

  async removeHospitalIdFromPharmacistDocument(args: {
    hospitalId: Types.ObjectId;
    pharmacistAddress: string;
  }) {
    const { hospitalId, pharmacistAddress } = args;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      const pharmacist =
        await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'hospital not found',
        };
      }

      if (!pharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'pharmacist not found',
        };
      }

      pharmacist.hospitalIds.splice(
        pharmacist.hospitalIds.indexOf(hospital.id),
        1,
      );
      if (pharmacist.hospitalIds.length === 0) {
        pharmacist.status = ApprovalStatus.Pending;
        pharmacist.hospitalIds = [];
      }

      await pharmacist.save();
    } catch (error) {
      console.error(error);
      throw new HospitalError(
        'Error removing hospital id from pharmacist document',
      );
    }
  }

  async removeHospitalIdFromPractitionerDocument(args: {
    hospitalId: Types.ObjectId;
    practitionerAddress: string;
  }) {
    const { hospitalId, practitionerAddress } = args;
    try {
      const isDoctor =
        await this.doctorGuard.validateDoctorExists(practitionerAddress);
      const isPharmacist =
        await this.pharmacistGuard.validatePharmacistExists(
          practitionerAddress,
        );

      if (isDoctor) {
        await this.removeHospitalIdFromDoctorDocument({
          hospitalId,
          doctorAddress: practitionerAddress,
        });
      } else if (isPharmacist) {
        await this.removeHospitalIdFromPharmacistDocument({
          hospitalId,
          pharmacistAddress: practitionerAddress,
        });
      } else {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'practitioner not found',
        };
      }
    } catch (error) {
      console.error(error);
      throw new HospitalError(
        'Error removing practitioner address for hospital',
      );
    }
  }

  async removePharmacistFromHospital(
    hospitalId: Types.ObjectId,
    pharmacistAddress: string,
  ) {
    try {
      return await this.hospitalDao.pullOnePharmacist(
        hospitalId,
        pharmacistAddress,
      );
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error removing pharmacist');
    }
  }

  async delegateAdminPosition(
    newAdminAddress: string,
    hospitalId: Types.ObjectId,
  ): Promise<{ success: number; message: string }> {
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        throw new HospitalError("Hospital doesn't exist");
      }

      const isAffiliated =
        (await this.returnDoctorFromHospital(hospital, newAdminAddress)) ||
        (await this.returnPharmacistFromHospital(hospital, newAdminAddress));
      if (
        !isAffiliated ||
        isAffiliated == undefined ||
        isAffiliated.status !== ApprovalStatus.Approved
      ) {
        throw new Error(
          'User is not affiliated with hospital or not yet approved',
        );
      }

      hospital.admin = newAdminAddress;
      await hospital.save();

      return {
        success: ErrorCodes.Success,
        message: 'Successfully delegated admin position',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error delegating admin position');
    }
  }

  async updateHospitalProfile(
    hospitalId: Types.ObjectId,
    updateData: UpdateHospitalProfileType,
  ) {
    const { regNo, ...rest } = updateData;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'hospital not found',
        };
      }
      const newUpdateData = {
        encryptedRegNo: this.encryptionService.encrypt({
          data: regNo,
        }),
        ...rest,
      };
      const updatedHospital = await this.hospitalDao.updateHospital(
        hospitalId,
        newUpdateData,
      );

      await hospital.save();
      return {
        success: HttpStatus.OK,
        message: 'hospital successfully updated',
        updatedHospital,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new HospitalError('Error updating hospital profile');
    }
  }

  async joinHospital(args: JoinHospitalType) {
    const { hospitalId, walletAddress } = args;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'hospital not found',
        };
      }

      const isDoctor =
        await this.doctorGuard.validateDoctorExists(walletAddress);
      const isPharmacist =
        await this.pharmacistGuard.validatePharmacistExists(walletAddress);

      if (!isDoctor && !isPharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'practitioner not found',
        };
      }

      if (isDoctor) {
        const doctorExist =
          await this.doctorGuard.validateDoctorExistsInHospital(
            hospital.id,
            walletAddress,
          );
        if (doctorExist) {
          return {
            success: HttpStatus.CREATED,
            message: 'doctor already exists in hospital',
          };
        }
        const doctor = await this.doctorDao.fetchDoctorByAddress(walletAddress);
        const doctorPreview: PreviewType = {
          id: doctor.id,
          walletAddress,
          profilePicture: doctor.profilePicture,
          name: doctor.name,
          status: doctor.status,
          category: doctor.category,
        };

        doctor.hospitalIds.push(hospital.id);
        await doctor.save();

        try {
          hospital.doctors.push(doctorPreview);
        } catch (error) {
          await this.removeHospitalIdFromDoctorDocument({
            hospitalId,
            doctorAddress: walletAddress,
          });

          return {
            success: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'an error occurred while adding doctor to  hospital',
          };
        }
      } else if (isPharmacist) {
        const pharmacistExist =
          await this.pharmacistGuard.validatePharmacistExistsInHospital(
            hospital.id,
            walletAddress,
          );
        if (pharmacistExist) {
          return {
            success: HttpStatus.CREATED,
            message: 'pharmacist already exists in hospital',
          };
        }
        const pharmacist =
          await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
        const pharmacistPreview: PreviewType = {
          id: pharmacist.id,
          walletAddress,
          profilePicture: pharmacist.profilePicture,
          name: pharmacist.name,
          status: pharmacist.status,
          category: pharmacist.category,
        };

        pharmacist.hospitalIds.push(hospital.id);
        await pharmacist.save();

        try {
          hospital.pharmacists.push(pharmacistPreview);
        } catch (error) {
          await this.removeHospitalIdFromPharmacistDocument({
            hospitalId,
            pharmacistAddress: walletAddress,
          });

          return {
            success: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'an error occurred while adding pharmacist to  hospital',
          };
        }
      }

      await hospital.save();
      return {
        success: HttpStatus.OK,
        message: 'joined hospital successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('An error occurred while joining hospital');
    }
  }

  async removePractitionerFromHospital(args: RemovePractitionerType) {
    const { hospitalId, walletAddress } = args;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      const isDoctor = await this.doctorGuard.validateDoctorExistsInHospital(
        hospital.id,
        walletAddress,
      );
      const isPharmacist =
        await this.pharmacistGuard.validatePharmacistExistsInHospital(
          hospital.id,
          walletAddress,
        );

      if (!isDoctor && !isPharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'practitioner not found',
        };
      }

      try {
        await this.removeHospitalIdFromPractitionerDocument({
          hospitalId,
          practitionerAddress: walletAddress,
        });

        if (isDoctor) {
          await this.removeDoctorFromHospital(hospitalId, walletAddress);
          await hospital.save();
        } else if (isPharmacist) {
          await this.removePharmacistFromHospital(hospitalId, walletAddress);
          await hospital.save();
        }
      } catch (error) {
        return {
          success: HttpStatus.EXPECTATION_FAILED,
          message:
            'an error occurred while removing practitioner from hospital',
        };
      }

      await hospital.save();
      return {
        success: HttpStatus.OK,
        message: 'practitioner removed from hospital successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('An error occurred while removing practitioner');
    }
  }

  async approvePractitioner(args: ApprovePractitionerType) {
    const { hospitalId, walletAddress } = args;
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      const isDoctor = await this.doctorGuard.validateDoctorExistsInHospital(
        hospital.id,
        walletAddress,
      );
      const isPharmacist =
        await this.pharmacistGuard.validatePharmacistExistsInHospital(
          hospital.id,
          walletAddress,
        );
      if (!isDoctor && !isPharmacist) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'practitioner not found',
        };
      }

      const practitioner = isDoctor
        ? await this.doctorDao.fetchDoctorByAddress(walletAddress)
        : await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);

      if (practitioner.status !== ApprovalStatus.Approved) {
        practitioner.status = ApprovalStatus.Approved;
        await practitioner.save();
      }

      if (isDoctor) {
        const doctorStatus = hospital.doctors.find(
          (p: PreviewType) => p.walletAddress === walletAddress,
        ).status;
        if (doctorStatus == ApprovalStatus.Approved) {
          return {
            success: HttpStatus.ACCEPTED,
            message: 'practitioner already approved',
          };
        }

        await this.hospitalDao.updateDoctorStatus(
          walletAddress,
          ApprovalStatus.Approved,
        );
      } else if (isPharmacist) {
        const pharmacistStatus = hospital.pharmacists.find(
          (p: PreviewType) => p.walletAddress === walletAddress,
        ).status;
        if (pharmacistStatus == ApprovalStatus.Approved) {
          return {
            success: HttpStatus.ACCEPTED,
            message: 'practitioner already approved',
          };
        }

        await this.hospitalDao.updatePharmacistStatus(
          walletAddress,
          ApprovalStatus.Approved,
        );
      }

      return {
        success: HttpStatus.OK,
        message: 'practitioner approved successfully',
      };
    } catch (error) {
      console.error(error);
      return {
        success: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'internal server error',
      };
    }
  }

  /**
   * Hospital Read operations
   */

  async fetchApprovedHospitals() {
    try {
      const hospitals =
        await this.hospitalDao.fetchHospitalWithApprovedStatus();
      if (!hospitals) {
        console.log('No approved hospitals');
        throw new HospitalError('No approved hospitals found');
      }
      if (hospitals.length === 0) {
        return {
          success: 404,
          hospitals: [],
        };
      }

      return {
        success: 200,
        hospitals,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved hospitals');
    }
  }

  async fetchPendingHospitals() {
    try {
      const hospitals = await this.hospitalDao.fetchHospitalWithPendingStatus();
      if (!hospitals) {
        console.log('No approved hospitals');
        throw new HospitalError('No approved hospitals found');
      }
      if (hospitals.length === 0) {
        return {
          success: 404,
          hospitals: [],
        };
      }

      return {
        success: 200,
        hospitals,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HospitalError('Error fetching approved hospitals');
    }
  }

  async fetchAllHospitals() {
    try {
      const hospitals = await this.hospitalModel.find();
      if (!hospitals) {
        return {
          success: ErrorCodes.NotFound,
          hospitals: [],
        };
      }

      const decryptedHospital: any = [];

      hospitals.forEach((hospital) => {
        const _decryptedHospital = {
          ...hospital.toObject(),
          regNo: this.encryptionService.decrypt({ data: hospital.regNo }),
        };
        decryptedHospital.push(_decryptedHospital);
      });

      return {
        success: ErrorCodes.Success,
        hospital: decryptedHospital,
      };
    } catch (error) {
      this.logger.info('Error fetching all hospitals');
      throw new HospitalError('Error fetching all hospitals');
    }
  }

  async fetchHospitalById(id: Types.ObjectId) {
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(id);
      if (!hospital) {
        return {
          success: ErrorCodes.NotFound,
          message: 'Hospital not found',
        };
      }

      const decryptedHospital = {
        ...hospital.toObject(),
        regNo: this.encryptionService.decrypt({ data: hospital.regNo }),
      };

      return {
        success: ErrorCodes.Success,
        hospital: decryptedHospital,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof MongooseError)
        throw new MongooseError(error.message);
      throw new InternalServerErrorException('Error fetching hospital');
    }
  }

  async fetchPendingDoctors(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Pending;
      });

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No pending doctors found',
        };
      }

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'pending doctors found',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pending doctors');
    }
  }

  async fetchPendingPharmacists(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exist");
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Pending;
        },
      );

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No pending pharmacists found',
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'pending pharmacists found',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pharmacists');
    }
  }

  async fetchApprovedDoctors(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists");
      }

      const doctors = hospital.doctors.filter((doctor: PreviewType) => {
        return doctor.status === ApprovalStatus.Approved;
      });

      if (doctors.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
          message: 'No approved doctors found',
        };
      }

      console.log(doctors);

      return {
        success: ErrorCodes.Success,
        doctors,
        message: 'Approved doctors fetched successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved doctors');
    }
  }

  async fetchApprovedPharmacists(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);
      if (!hospital) {
        throw new HospitalError("hospital doesn't exists");
      }

      const pharmacists = hospital.pharmacists.filter(
        (pharmacist: PreviewType) => {
          return pharmacist.status === ApprovalStatus.Approved;
        },
      );

      if (pharmacists.length === 0) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
          message: 'No approved pharmacists found',
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
        message: 'Approved pharmacists fetched successfully',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching pharmacists');
    }
  }

  async fetchAllDoctors(hospitalId: Types.ObjectId) {
    if (!hospitalId) {
      throw new HospitalError('Invalid or missing hospital id');
    }

    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);

      const doctors = hospital.doctors;

      if (!doctors) {
        return {
          success: ErrorCodes.NotFound,
          doctors: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        doctors,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching approved doctors');
    }
  }

  async fetchAllPharmacists(hospitalId: Types.ObjectId) {
    try {
      const { hospital } = await this.fetchHospitalById(hospitalId);

      const pharmacists = hospital.pharmacists;
      if (!pharmacists) {
        return {
          success: ErrorCodes.NotFound,
          pharmacists: [],
        };
      }

      return {
        success: ErrorCodes.Success,
        pharmacists,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error fetching pharmacists');
    }
  }

  async fetchHospitalPractitioners(hospitalId: Types.ObjectId) {
    try {
      const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
      if (!hospital) {
        throw new HttpException(
          { message: 'invalid hospital id' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const { doctors } = await this.fetchAllDoctors(hospitalId);
      const { pharmacists } = await this.fetchAllPharmacists(hospitalId);
      const allPractitioners = doctors.concat(pharmacists);

      if (!allPractitioners) {
        return {
          success: HttpStatus.FOUND,
          practitioners: [],
        };
      }

      return {
        success: HttpStatus.OK,
        practitioners: allPractitioners,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async returnDoctorFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const Doctor = hospital.doctors.find((d: PreviewType) => {
        return d.walletAddress === walletAddress;
      });

      if (!Doctor) {
        console.info('Doctor not found');
      }

      return Doctor;
    } catch (error) {
      console.error(error);
      throw new HospitalError('Error finding doctor');
    }
  }

  async returnPharmacistFromHospital(
    hospital: HospitalType,
    walletAddress: string,
  ): Promise<PreviewType | undefined> {
    try {
      const pharmacists = hospital.pharmacists.find((d: PreviewType) => {
        return d.walletAddress === walletAddress;
      });
      if (!pharmacists) {
        console.info('pharmacist not found');
      }

      return pharmacists;
    } catch (error) {
      console.error(error);
      throw new HospitalError('pharmacists not found');
    }
  }

  private async validatePractitioner(walletAddress: string) {
    let isPractitioner = false;

    if (
      (await this.doctorGuard.validateDoctorExists(walletAddress)) ||
      (await this.pharmacistGuard.validatePharmacistExists(walletAddress))
    ) {
      isPractitioner = true;
    }

    return isPractitioner;
  }

  async fetchPractitionerCreatedHospital(walletAddress: string) {
    try {
      const isPractitioner = await this.validatePractitioner(walletAddress);
      if (!isPractitioner) {
        return {
          success: HttpStatus.BAD_REQUEST,
          message: 'User is not a doctor or pharmacist',
        };
      }

      const hospitals = await this.hospitalDao.findManyHospital(walletAddress);

      if (!hospitals) {
        return {
          success: HttpStatus.NOT_FOUND,
          message: 'No hospitals found',
        };
      }

      return {
        success: HttpStatus.OK,
        hospitals,
      };
    } catch (error) {
      console.error(error);
      throw new HospitalError('An error occurred while fetching hospitals');
    }
  }

  @OnEvent(SharedEvents.INSTITUTION_JOINED, { async: true })
  async purgePractitioner(args: IPurgePractitioner) {
    const { walletAddress, hospitalId, role } = args;
    try {
      switch (role) {
        case 'doctor':
          await this.removeDoctorFromHospital(hospitalId, walletAddress);
          break;
        case 'pharmacist':
          await this.removePharmacistFromHospital(hospitalId, walletAddress);
          break;

        default:
          throw new BadRequestException('Invalid role');
      }
    } catch (e) {
      this.logger.log(e.message);
      throw new HttpException(
        { message: 'an error occurred while purging practitioner' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}