import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Career } from './entities/career.entity';
import { CareerController } from './careers.controller';
import { CareerService } from './careers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Career])],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}