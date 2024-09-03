import { AuthConfiguration } from '@/shared/config/auth.configuration';
import { Encrypt } from '../interface/encryption.interface';
export declare class EncryptionService {
    private readonly config;
    constructor(config: AuthConfiguration);
    encrypt(args: Encrypt): string;
    decrypt(args: Encrypt): string;
}
