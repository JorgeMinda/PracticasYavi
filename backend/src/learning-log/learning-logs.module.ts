import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningLog } from './entities/learning-log.entity';

import { LearningLogsService } from './learning-logs.service';
import { LearningLogsController } from './learning-logs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearningLog,
    ]),
  ],
  controllers: [
    LearningLogsController,
  ],
  providers: [
    LearningLogsService,
  ],
  exports: [
    LearningLogsService,
  ],
})
export class LearningLogsModule {}