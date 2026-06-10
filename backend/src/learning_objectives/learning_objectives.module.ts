import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 Asegúrate de importar esto

import { LearningObjectivesService } from './learning_objectives.service';
import { LearningObjectivesController } from './learning_objectives.controller';
import { LearningObjective } from './entities/learning_objective.entity'; // 👈 Importa tu entidad (revisa que la ruta sea correcta)

@Module({
  imports: [
    // 👈 ESTA ES LA LÍNEA CRUCIAL QUE FALTABA
    TypeOrmModule.forFeature([LearningObjective]), 
  ],
  controllers: [LearningObjectivesController],
  providers: [LearningObjectivesService],
})
export class LearningObjectivesModule {}