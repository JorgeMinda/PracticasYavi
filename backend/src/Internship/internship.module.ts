import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from './internship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Internship])],
  exports: [TypeOrmModule],
})
export class InternshipModule {}