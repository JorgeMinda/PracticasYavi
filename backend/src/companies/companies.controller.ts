import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompaniesService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.companyService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.companyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.companyService.remove(id);
  }
}