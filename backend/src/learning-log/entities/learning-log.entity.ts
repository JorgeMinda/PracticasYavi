import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('learning_logs')
export class LearningLog {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
  })
  id!: number;

  @Column({
    type: 'bigint',
  })
  internship_id!: number;

  @Column({
    type: 'int',
  })
  week!: number;

  @Column({
    type: 'date',
  })
  date!: Date;

  @Column({
    type: 'varchar',
    length: 255,
  })
  department!: string;

  @Column({
    type: 'text',
  })
  activities!: string;

  @Column({
    type: 'text',
  })
  learned!: string;

  @Column({
    type: 'text',
  })
  observations!: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at!: Date;
}