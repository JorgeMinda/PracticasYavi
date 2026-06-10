import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrainingPlan } from './entities/training-plan.entity';
import { TrainingPlanController } from './training-plans.controller';
import { TrainingPlanService } from './training-plans.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingPlan])],
  controllers: [TrainingPlanController],
  providers: [TrainingPlanService],
})
export class TrainingPlanModule {}