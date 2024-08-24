import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { AuthConfiguration } from '@/shared/config/auth.configuration';

describe('Encryption', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: AuthConfiguration,
          useValue: {
            ENCRYPTION_KEY: '',
          },
        },
      ],
    }).compile();

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should successfully encrypt a string', async () => {
    const data = 'verySecureString';
    const encryptedString = await service.encrypt({ data });

    console.log(encryptedString);
    expect(encryptedString).toBeDefined();
  });
});
