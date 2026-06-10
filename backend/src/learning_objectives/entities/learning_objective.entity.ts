import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('learning_objectives')
export class LearningObjective {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  semester_id!: number;

  @Column('text')
  description!: string;

  @Column({ nullable: true })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;
}