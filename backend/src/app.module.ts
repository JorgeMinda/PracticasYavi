import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CareerModule } from './careers/careers.module';
import { CompaniesModule } from './companies/companies.module';
import { LearningResultModule } from './learning-results/learning-results.module';
import { WeekModule } from './weeks/weeks.module';
import { RotationPlanModule } from './rotation-plans/rotation-plans.module';
import { TrainingPlanModule } from './training-plans/training-plans.module';
import { LearningObjectivesModule } from './learning_objectives/learning_objectives.module';
import { ExpectedAchievementModule } from './expected_achievements/expected_achievements.module';
import { InternshipModule } from './Internship/internship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),

   UserModule,

   CareerModule,

   CompaniesModule,

   LearningResultModule,

   WeekModule,

   RotationPlanModule,

   TrainingPlanModule,

   LearningObjectivesModule,

   ExpectedAchievementModule ,
   InternshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}