import { HttpStatus } from '@nestjs/common';
import { TermillProvider } from '../dao/termill.dao';
import { TermillDataInterface } from '../interface/termill.interface';
export declare class TermillService {
    private readonly termillProvider;
    constructor(termillProvider: TermillProvider);
    sendSMS(data: TermillDataInterface): Promise<{
        success: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        success: HttpStatus;
        message: string;
        data: Response;
    }>;
}
