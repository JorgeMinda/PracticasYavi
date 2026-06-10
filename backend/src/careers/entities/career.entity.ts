import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('careers')
export class Career {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  created_at!: Date;

  @Column({ nullable: true })
  updated_at!: Date;
}