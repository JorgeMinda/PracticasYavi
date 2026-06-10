import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RotationPlan } from './entities/rotation-plan.entity';

@Injectable()
export class RotationPlanService {
  constructor(
    @InjectRepository(RotationPlan)
    private readonly rotationPlanRepository: Repository<RotationPlan>,
  ) {}

  findAll() {
    return this.rotationPlanRepository.find();
  }

  findOne(id: number) {
    return this.rotationPlanRepository.findOneBy({ id });
  }

  create(data: Partial<RotationPlan>) {
    return this.rotationPlanRepository.save(data);
  }

  update(id: number, data: Partial<RotationPlan>) {
    return this.rotationPlanRepository.update(id, data);
  }

  remove(id: number) {
    return this.rotationPlanRepository.delete(id);
  }
}