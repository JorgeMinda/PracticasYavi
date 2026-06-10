import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RotationPlan } from './entities/rotation-plan.entity';
import { RotationPlanController } from './rotation-plans.controller';
import { RotationPlanService } from './rotation-plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([RotationPlan])],
  controllers: [RotationPlanController],
  providers: [RotationPlanService],
})
export class RotationPlanModule {}