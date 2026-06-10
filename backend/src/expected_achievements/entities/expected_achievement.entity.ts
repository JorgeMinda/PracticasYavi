import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('expected_achievements')
export class ExpectedAchievement {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint' })
  semester_id!: number;

  @Column('text')
  description!: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  created_at!: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  updated_at!: Date;
}