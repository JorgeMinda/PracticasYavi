import { Test, TestingModule } from '@nestjs/testing';
import { LearningResultsService } from './learning-results.service';

describe('LearningResultsService', () => {
  let service: LearningResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningResultsService],
    }).compile();

    service = module.get<LearningResultsService>(LearningResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
