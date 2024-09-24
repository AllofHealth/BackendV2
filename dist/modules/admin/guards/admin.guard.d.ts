import { AdminDao } from '../dao/admin.dao';
export declare class AdminGuard {
    private readonly adminDao;
    constructor(adminDao: AdminDao);
    validateAdmin(address: string): Promise<boolean>;
}
