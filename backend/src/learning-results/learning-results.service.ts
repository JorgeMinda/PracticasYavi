import { Injectable } from '@nestjs/common';

import { LearningResult } from './entities/learning-result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LearningResultService {
  constructor(
    @InjectRepository(LearningResult)
    private readonly learningResultRepository: Repository<LearningResult>,
  ) {}

  findAll() {
    return this.learningResultRepository.find();
  }

  findOne(id: number) {
    return this.learningResultRepository.findOneBy({ id });
  }

  create(data: Partial<LearningResult>) {
    return this.learningResultRepository.save(data);
  }

  update(id: number, data: Partial<LearningResult>) {
    return this.learningResultRepository.update(id, data);
  }

  remove(id: number) {
    return this.learningResultRepository.delete(id);
  }
}