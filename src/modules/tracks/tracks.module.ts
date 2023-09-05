import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    JwtModule,
  ],
  exports: [TypeOrmModule, TracksService],
})
export class TracksModule {}
