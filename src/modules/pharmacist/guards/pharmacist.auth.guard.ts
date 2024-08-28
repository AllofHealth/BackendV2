import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PharmacistDao } from '../dao/pharmacist.dao';
import { ApprovalStatus } from '@/shared';

@Injectable()
export class PharmacistAuthGuard implements CanActivate {
  constructor(private readonly pharmacistDao: PharmacistDao) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const pharmacistAddress = request.query.walletAddress;

    if (!pharmacistAddress) {
      throw new ForbiddenException('Invalid request');
    }

    const pharmacist =
      await this.pharmacistDao.fetchPharmacistByAddress(pharmacistAddress);
    if (!pharmacist && pharmacist.status !== ApprovalStatus.Approved) {
      throw new UnauthorizedException('Pharmacist not found or not approved');
    }
    return true;
  }
}

export class PharmacistVerificationGuard implements CanActivate {
  constructor(private readonly pharmacistDao: PharmacistDao) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const walletAddress = request.query.walletAddress;

    const pharmacist =
      await this.pharmacistDao.fetchPharmacistByAddress(walletAddress);
    if (!pharmacist.isVerified) {
      throw new ForbiddenException('please complete verification');
    }
    return true;
  }
}
