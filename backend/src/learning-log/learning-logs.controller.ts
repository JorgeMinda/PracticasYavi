import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { LearningLogsService } from './learning-logs.service';

import { CreateLearningLogDto } from './dto/create-learning-log.dto';
import { UpdateLearningLogDto } from './dto/update-learning-log.dto';

@Controller('learning-logs')
export class LearningLogsController {
  constructor(
    private readonly service: LearningLogsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateLearningLogDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateLearningLogDto,
  ) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.service.remove(+id);
  }
}