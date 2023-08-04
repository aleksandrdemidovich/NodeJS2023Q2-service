import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  name: string;

  @Column()
  duration: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string;

  @Column({ type: 'uuid', nullable: true })
  albumId: string;
}
