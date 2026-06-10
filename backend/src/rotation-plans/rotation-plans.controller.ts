import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { RotationPlanService } from './rotation-plans.service';

@Controller('rotation-plans')
export class RotationPlanController {
  constructor(
    private readonly rotationPlanService: RotationPlanService,
  ) {}

  @Get()
  findAll() {
    return this.rotationPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rotationPlanService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.rotationPlanService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.rotationPlanService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rotationPlanService.remove(id);
  }
}