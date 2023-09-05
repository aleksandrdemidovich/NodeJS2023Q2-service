import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { datasourceOptions } from './db/data-source-config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AuthModule } from './modules/auth/auth.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
