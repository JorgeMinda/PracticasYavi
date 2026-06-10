import { Test, TestingModule } from '@nestjs/testing';
import { LearningResultController } from './learning-results.controller';
import { LearningResultService } from './learning-results.service';

describe('LearningResultsController', () => {
  let controller: LearningResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningResultsController],
      providers: [LearningResultsService],
    }).compile();

    controller = module.get<LearningResultsController>(LearningResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
