import { Test, TestingModule } from '@nestjs/testing';
import { RotationPlansController } from './rotation-plans.controller';
import { RotationPlansService } from './rotation-plans.service';

describe('RotationPlansController', () => {
  let controller: RotationPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RotationPlansController],
      providers: [RotationPlansService],
    }).compile();

    controller = module.get<RotationPlansController>(RotationPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
