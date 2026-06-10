import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Week } from './entities/week.entity';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(Week)
    private readonly weekRepository: Repository<Week>,
  ) {}

  findAll() {
    return this.weekRepository.find();
  }

  findOne(id: number) {
    return this.weekRepository.findOneBy({ id });
  }

  create(data: Partial<Week>) {
    return this.weekRepository.save(data);
  }

  update(id: number, data: Partial<Week>) {
    return this.weekRepository.update(id, data);
  }

  remove(id: number) {
    return this.weekRepository.delete(id);
  }
}