import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TypeOrmModule.forFeature([Album]), forwardRef(() => ArtistsModule)],
  exports: [TypeOrmModule, AlbumsService],
})
export class AlbumsModule {}
