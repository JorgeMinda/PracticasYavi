import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Week } from './entities/week.entity';
import { WeekController } from './weeks.controller';
import { WeekService } from './weeks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Week])],
  controllers: [WeekController],
  providers: [WeekService],
})
export class WeekModule {}