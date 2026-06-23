import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateRotationPlanDto {
  @IsInt()
  internship_id: number;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  activities: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;
}