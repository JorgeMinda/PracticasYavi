import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { LearningResultService } from './learning-results.service';

@Controller('learning-results')
export class LearningResultController {
  constructor(
    private readonly learningResultService: LearningResultService,
  ) {}

  @Get()
  findAll() {
    return this.learningResultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.learningResultService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.learningResultService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.learningResultService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.learningResultService.remove(id);
  }
}