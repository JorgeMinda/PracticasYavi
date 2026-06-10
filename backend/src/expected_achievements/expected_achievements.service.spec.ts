import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedAchievementsService } from './expected_achievements.service';

describe('ExpectedAchievementsService', () => {
  let service: ExpectedAchievementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedAchievementsService],
    }).compile();

    service = module.get<ExpectedAchievementsService>(ExpectedAchievementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
