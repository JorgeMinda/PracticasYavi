import { Test, TestingModule } from '@nestjs/testing';
import { LearningObjectivesController } from './learning_objectives.controller';
import { LearningObjectivesService } from './learning_objectives.service';

describe('LearningObjectivesController', () => {
  let controller: LearningObjectivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearningObjectivesController],
      providers: [LearningObjectivesService],
    }).compile();

    controller = module.get<LearningObjectivesController>(LearningObjectivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
