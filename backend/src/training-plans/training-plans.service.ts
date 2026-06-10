import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingPlan } from './entities/training-plan.entity';

@Injectable()
export class TrainingPlanService {
  constructor(
    @InjectRepository(TrainingPlan)
    private readonly trainingPlanRepository: Repository<TrainingPlan>,
  ) {}

  findAll() {
    return this.trainingPlanRepository.find();
  }

  findOne(id: number) {
    return this.trainingPlanRepository.findOneBy({ id });
  }

  create(data: Partial<TrainingPlan>) {
    return this.trainingPlanRepository.save(data);
  }

  update(id: number, data: Partial<TrainingPlan>) {
    return this.trainingPlanRepository.update(id, data);
  }

  remove(id: number) {
    return this.trainingPlanRepository.delete(id);
  }
}