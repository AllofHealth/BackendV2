import { RoleType } from '@/modules/otp/interface/otp.interface';

export class EntityCreatedDto {
  constructor(
    readonly walletAddress: string,
    readonly email: string,
    readonly role: RoleType,
  ) {}
}
