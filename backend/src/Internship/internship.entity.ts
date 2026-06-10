import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Week } from '../weeks/entities/week.entity';
import { RotationPlan } from '../rotation-plans/entities/rotation-plan.entity';
import { TrainingPlan } from '../training-plans/entities/training-plan.entity';

@Entity('internships')
export class Internship {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @OneToMany(() => Week, week => week.internship)
  weeks!: Week[];

  @OneToMany(() => RotationPlan, rotation => rotation.internship)
  rotationPlans!: RotationPlan[];

  @OneToMany(() => TrainingPlan, training => training.internship)
  trainingPlans!: TrainingPlan[];
}