import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectivesService } from './learning_objectives.service';

describe('LearningObjectivesService', () => {
  let service: LearningObjectivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningObjectivesService],
    }).compile();

    service = module.get<LearningObjectivesService>(LearningObjectivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
