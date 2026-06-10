import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningResultDto } from './create-learning-result.dto';

export class UpdateLearningResultDto extends PartialType(CreateLearningResultDto) {}
