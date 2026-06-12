import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LearningLog } from './entities/learning-log.entity';
import { CreateLearningLogDto } from './dto/create-learning-log.dto';
import { UpdateLearningLogDto } from './dto/update-learning-log.dto';

@Injectable()
export class LearningLogsService {
  constructor(
    @InjectRepository(LearningLog)
    private readonly repository: Repository<LearningLog>,
  ) {}

  create(dto: CreateLearningLogDto) {
    const entity = this.repository.create(dto);

    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    dto: UpdateLearningLogDto,
  ) {
    await this.repository.update(id, dto);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repository.delete(id);

    return {
      message: 'Registro eliminado correctamente',
    };
  }
}