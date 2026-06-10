import { PartialType } from '@nestjs/mapped-types';
import { CreateRotationPlanDto } from './create-rotation-plan.dto';

export class UpdateRotationPlanDto extends PartialType(CreateRotationPlanDto) {}
