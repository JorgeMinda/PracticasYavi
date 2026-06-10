import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpectedAchievementsService } from './expected_achievements.service';
import { ExpectedAchievementsController } from './expected_achievements.controller';
import { ExpectedAchievement } from './entities/expected_achievement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpectedAchievement]), // 👈 Crucial para que TypeORM lo reconozca
  ],
  controllers: [ExpectedAchievementsController],
  providers: [ExpectedAchievementsService],
  exports: [TypeOrmModule], // Lo exportamos por si acaso el módulo LearningResult lo necesita
})
export class ExpectedAchievementModule {}