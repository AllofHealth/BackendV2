import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HospitalDao } from '../dao/hospital.dao';
import { ApprovalStatus } from '@/shared';

@Injectable()
export class HospitalAuthGuard implements CanActivate {
  constructor(private readonly hospitalDao: HospitalDao) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { adminAddress, hospitalId } = request.query;

    if (!adminAddress && !hospitalId) {
      throw new ForbiddenException('Invald request');
    }

    const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
    if (
      hospital.status !== ApprovalStatus.Approved &&
      hospital.admin !== adminAddress
    ) {
      throw new ForbiddenException('Institution not approved or Invalid admin');
    }
    return true;
  }
}
