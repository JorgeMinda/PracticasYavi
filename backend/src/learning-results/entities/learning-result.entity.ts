import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Internship } from '../../Internship/internship.entity';
import { Week } from '../../weeks/entities/week.entity';
import { LearningObjective } from '../../learning_objectives/entities/learning_objective.entity';
import { ExpectedAchievement } from '../../expected_achievements/entities/expected_achievement.entity';

@Entity('learning_results')
export class LearningResult {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  internship_id!: number;

  @Column()
  learning_objective_id!: number;

  @Column()
  expected_achievement_id!: number;

  @Column()
  week_id!: number;

  @Column('text')
  result!: string;

  @Column({ nullable: true })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Internship)
  @JoinColumn({ name: 'internship_id' })
  internship!: Internship;

  @ManyToOne(() => Week)
  @JoinColumn({ name: 'week_id' })
  week!: Week;

  @ManyToOne(() => LearningObjective)
  @JoinColumn({ name: 'learning_objective_id' })
  learningObjective!: LearningObjective;

  @ManyToOne(() => ExpectedAchievement)
  @JoinColumn({ name: 'expected_achievement_id' })
  expectedAchievement!: ExpectedAchievement;
}