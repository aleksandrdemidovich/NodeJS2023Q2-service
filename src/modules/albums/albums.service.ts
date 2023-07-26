import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';
import { mockAlbums, mockTracks } from 'src/db/db';
import { validateId } from 'src/shared/utils/uuidUtils';

@Injectable()
export class AlbumsService {
  create({ name, year, artistId }: CreateAlbumDto): Album {

    const newAlbum: Album = {
      id: v4(),
      name,
      year,
      artistId,
    };
    mockAlbums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return mockAlbums;
  }

  findOne(id: string): Album {
    validateId(id);
    const album = mockAlbums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto): Album {
    validateId(id);
    const album = mockAlbums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return album;
  }

  remove(id: string) {
    validateId(id);
    const albumIndex = mockAlbums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    mockAlbums.splice(albumIndex, 1);

    mockTracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
