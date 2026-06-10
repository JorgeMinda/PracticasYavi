import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { WeekService } from './weeks.service';

@Controller('weeks')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get()
  findAll() {
    return this.weekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.weekService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.weekService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.weekService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.weekService.remove(id);
  }
}