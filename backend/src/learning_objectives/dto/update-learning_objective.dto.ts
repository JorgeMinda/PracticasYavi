import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningObjectiveDto } from './create-learning_objective.dto';

export class UpdateLearningObjectiveDto extends PartialType(CreateLearningObjectiveDto) {}
