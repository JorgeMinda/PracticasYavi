import { PartialType } from '@nestjs/mapped-types';
import { CreateExpectedAchievementDto } from './create-expected_achievement.dto';

export class UpdateExpectedAchievementDto extends PartialType(CreateExpectedAchievementDto) {}
