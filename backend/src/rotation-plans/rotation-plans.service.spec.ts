import { Test, TestingModule } from '@nestjs/testing';
import { RotationPlansService } from './rotation-plans.service';

describe('RotationPlansService', () => {
  let service: RotationPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RotationPlansService],
    }).compile();

    service = module.get<RotationPlansService>(RotationPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
