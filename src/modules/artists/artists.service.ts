import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { mockArtists, mockTracks } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { validateId } from 'src/shared/utils/uuidUtils';

@Injectable()
export class ArtistsService {
  create({ name, grammy }: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: v4(),
      name,
      grammy,
    };
    mockArtists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return mockArtists;
  }

  findOne(id: string): Artist {
    validateId(id);

    const artist = mockArtists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto): Artist {
    validateId(id);
    const artist = mockArtists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  remove(id: string) {
    validateId(id);
    const artistIndex = mockArtists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    mockArtists.splice(artistIndex, 1);

    mockTracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }
}
