import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  names!: string;

  @Column()
  lastnames!: string;

  @Column()
  cedula!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  role_id!: number;

  @Column()
  active!: boolean;
}