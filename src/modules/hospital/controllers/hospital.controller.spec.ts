import { Test, TestingModule } from '@nestjs/testing';
import { HospitalController } from './hospital.controller';
import { HospitalService } from '../services/hospital.service';
import { HospitalAuthGuard } from '../guard/hospital.auth.guard';
import { HospitalApprovedGuard } from '../guard/hospital.approved.guard';
import { HospitalModule } from '../hospital.module';

describe('HospitalController', () => {
  let controller: HospitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HospitalModule],
      providers: [HospitalService, HospitalAuthGuard, HospitalApprovedGuard],
      controllers: [HospitalController],
    }).compile();

    controller = module.get<HospitalController>(HospitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
