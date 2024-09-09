import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const adminAddress = request.query.adminAddress;

    if (!adminAddress) {
      throw new ForbiddenException('please connect wallet');
    }

    if (!(await this.adminService.isAdminAuthenticated(adminAddress))) {
      throw new ForbiddenException('Not an authenticated admin');
    }

    return true;
  }
}
