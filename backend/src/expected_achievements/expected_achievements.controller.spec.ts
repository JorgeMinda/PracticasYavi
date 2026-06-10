import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedAchievementsController } from './expected_achievements.controller';
import { ExpectedAchievementsService } from './expected_achievements.service';

describe('ExpectedAchievementsController', () => {
  let controller: ExpectedAchievementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedAchievementsController],
      providers: [ExpectedAchievementsService],
    }).compile();

    controller = module.get<ExpectedAchievementsController>(ExpectedAchievementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
