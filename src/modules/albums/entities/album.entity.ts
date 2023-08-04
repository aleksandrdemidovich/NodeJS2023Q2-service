import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column()
  year: number;


  @Column({ type: 'uuid', nullable: true })
  artistId: string;

}