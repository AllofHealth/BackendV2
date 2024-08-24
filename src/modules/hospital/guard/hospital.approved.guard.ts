import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HospitalDao } from '../dao/hospital.dao';
import { ApprovalStatus } from '@/shared';

@Injectable()
export class HospitalApprovedGuard implements CanActivate {
  constructor(private readonly hospitalDao: HospitalDao) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const hospitalId = request.query.hospitalId;

    if (!hospitalId) {
      throw new ForbiddenException('Invalid institution id');
    }

    const hospital = await this.hospitalDao.fetchHospitalWithId(hospitalId);
    if (!hospital) {
      throw new ForbiddenException('Invalid institution id');
    }

    if (hospital.status !== ApprovalStatus.Approved) {
      throw new ForbiddenException('Institution not approved');
    }
    return true;
  }
}
