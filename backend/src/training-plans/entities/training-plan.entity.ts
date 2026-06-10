import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Internship } from '../../Internship/internship.entity';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  internship_id!: number;

  @Column('text')
  objectives!: string;

  @Column('text')
  competencies!: string;

  @Column('text')
  activities!: string;

  @Column({ nullable: true })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Internship, (internship) => internship.trainingPlans)
  @JoinColumn({ name: 'internship_id' })
  internship!: Internship;
}