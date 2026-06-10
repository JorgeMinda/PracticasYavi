import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CareerService } from './careers.service';

@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.careerService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.careerService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.careerService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.careerService.remove(id);
  }
}