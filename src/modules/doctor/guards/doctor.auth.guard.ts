import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
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
      throw new ForbiddenException('Doctor not found');
    }
    if (doctor.status !== ApprovalStatus.Approved) {
      throw new ForbiddenException('Doctor not approved by any institution');
    }

    return true;
  }
}
