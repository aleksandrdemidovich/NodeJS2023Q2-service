import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { Favorite } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [TypeOrmModule, FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
})
export class FavoritesModule {}
