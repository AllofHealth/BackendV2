import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
export declare class AdminAuthGuard implements CanActivate {
    private readonly adminService;
    constructor(adminService: AdminService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
