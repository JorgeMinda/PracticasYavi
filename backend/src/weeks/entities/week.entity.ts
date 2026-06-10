import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Internship } from '../../Internship/internship.entity';

@Entity('weeks')
export class Week {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  internship_id!: number;

  @Column()
  week_number!: number;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column({ nullable: true })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;

  @ManyToOne(() => Internship, (internship) => internship.weeks)
  @JoinColumn({ name: 'internship_id' })
  internship!: Internship;
}