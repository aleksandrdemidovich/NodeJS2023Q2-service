import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({
    length: 20,
  })
  login: string;

  @Column({
    length: 20,
  })
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | number; // timestamp of creation

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date | number; // timestamp of last update
}
