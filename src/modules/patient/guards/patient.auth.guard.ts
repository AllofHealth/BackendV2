import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PatientDao } from '../dao/patient.dao';

@Injectable()
export class PatientAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const patientAddress = request.query.walletAddress;

    if (!patientAddress) {
      throw new UnauthorizedException('Please connect your wallet');
    }
    return true;
  }
}

@Injectable()
export class PatientVerificationGuard implements CanActivate {
  constructor(private readonly patientDao: PatientDao) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const patientAddress = request.query.walletAddress;
    const patient = await this.patientDao.fetchPatientByAddress(patientAddress);

    if (!patient || !patient.isVerified) {
      throw new ForbiddenException('please complete verification');
    }
    return true;
  }
}