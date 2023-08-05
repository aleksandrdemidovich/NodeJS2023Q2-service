import * as dotenv from 'dotenv';
dotenv.config();
import { join } from 'path';
import { Album } from 'src/modules/albums/entities/album.entity';
import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Artist, Album, Track, Favorite],
  migrations: [join(__dirname, '..', 'db/migrations/*.{ts,js}')],
};

const dataSource = new DataSource(datasourceOptions);
export default dataSource;
