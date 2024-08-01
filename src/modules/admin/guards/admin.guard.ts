import { Injectable } from '@nestjs/common';
import { AdminDao } from '../dao/admin.dao';
import { AdminError } from 'src/shared';

@Injectable()
export class AdminGuard {
  constructor(private readonly adminDao: AdminDao) {}

  async validateAdmin(address: string) {
    let adminExists: boolean = false;
    try {
      const admin = await this.adminDao.validateAdminExists(address);

      if (admin) {
        adminExists = true;
      }

      return adminExists;
    } catch (error) {
      console.error(error);
      throw new AdminError('Error validating admin exists');
    }
  }
}
