import { AuthConfiguration } from '@/shared/config/auth.configuration';
import { Injectable } from '@nestjs/common';
import { Encrypt } from '../interface/encryption.interface';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private readonly config: AuthConfiguration) {}

  encrypt(args: Encrypt) {
    const { data, key } = args;
    const iv = crypto.randomBytes(16);

    let EncryptedKey = this.config.ENCRYPTION_KEY;
    console.log(EncryptedKey);
    console.log(this.config.SERVER_TOKEN);

    if (key) EncryptedKey = key;
    const BufferKey = Buffer.from(EncryptedKey, 'base64');

    const cipher = crypto.createCipheriv('aes-256-cbc', BufferKey, iv);

    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(args: Encrypt) {
    const { data, key } = args;
    const textParts = data.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');

    let EncryptedKey = this.config.ENCRYPTION_KEY;
    if (key) EncryptedKey = key;

    const BufferKey = Buffer.from(EncryptedKey, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', BufferKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}
