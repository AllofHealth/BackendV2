import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DoctorDao } from '../dao/doctor.dao';
import { ApprovalStatus } from '@/shared';

@Injectable()
export class DoctorAuthGuard implements CanActivate {
  constructor(private readonly doctorDao: DoctorDao) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const doctorAddress = request.query.doctorAddress;

    if (!doctorAddress) {
      throw new ForbiddenException('Please connect wallet');
    }

    const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
    if (!doctor) {
      throw new UnauthorizedException();
    }
    if (doctor.status !== ApprovalStatus.Approved) {
      throw new UnauthorizedException('Doctor not approved by any institution');
    }

    return true;
  }
}

@Injectable()
export class DoctorVerificationGuard implements CanActivate {
  constructor(private readonly doctorDao: DoctorDao) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const doctorAddress = request.query.doctorAddress;

    const doctor = await this.doctorDao.fetchDoctorByAddress(doctorAddress);
    if (!doctor.isVerified) {
      throw new ForbiddenException('please complete verification');
    }

    return true;
  }
}
