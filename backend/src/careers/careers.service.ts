import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from './entities/career.entity';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  findAll() {
    return this.careerRepository.find();
  }

  findOne(id: number) {
    return this.careerRepository.findOneBy({ id });
  }

  create(data: Partial<Career>) {
    return this.careerRepository.save(data);
  }

  update(id: number, data: Partial<Career>) {
    return this.careerRepository.update(id, data);
  }

  remove(id: number) {
    return this.careerRepository.delete(id);
  }
}