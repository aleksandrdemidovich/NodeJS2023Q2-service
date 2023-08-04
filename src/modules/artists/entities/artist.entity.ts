import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column({ default: false })
  grammy: boolean;
}
