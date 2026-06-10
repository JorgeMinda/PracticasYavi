
import { LearningResult } from './entities/learning-result.entity';
import { Module } from '@nestjs/common';
import { LearningResultController } from './learning-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { LearningResultService } from './learning-results.service';



@Module({

  imports: [TypeOrmModule.forFeature([LearningResult])],

  controllers: [LearningResultController],

  providers: [LearningResultService],

})

export class LearningResultModule {}