import { Test, TestingModule } from '@nestjs/testing';
import { CareerService } from './careers.service';

describe('CareersService', () => {
  let service: CareerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareerService],
    }).compile();

    service = module.get<CareerService>(CareerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
