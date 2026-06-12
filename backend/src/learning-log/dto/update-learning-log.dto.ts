import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningLogDto } from './create-learning-log.dto';

export class UpdateLearningLogDto extends PartialType(
  CreateLearningLogDto,
) {}