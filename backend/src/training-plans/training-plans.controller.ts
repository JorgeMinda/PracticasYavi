import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { TrainingPlanService } from './training-plans.service';

@Controller('training-plans')
export class TrainingPlanController {
  constructor(
    private readonly trainingPlanService: TrainingPlanService,
  ) {}

  @Get()
  findAll() {
    return this.trainingPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.trainingPlanService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.trainingPlanService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.trainingPlanService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.trainingPlanService.remove(id);
  }
}