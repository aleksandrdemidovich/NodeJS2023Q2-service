import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { mockTracks } from 'src/db/db';
import { validateId } from 'src/shared/utils/uuidUtils';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  create({ name, artistId, albumId, duration }: CreateTrackDto): Track {
    const newTrack = {
      id: v4(),
      name,
      artistId,
      albumId,
      duration,
    };
    mockTracks.push(newTrack);

    return newTrack;
  }

  findAll(): Track[] {
    return mockTracks;
  }

  findOne(id: string): Track {
    validateId(id);
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  update(
    id: string,
    { albumId, artistId, duration, name }: UpdateTrackDto,
  ): Track {
    validateId(id);
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;

    return track;
  }

  remove(id: string) {
    validateId(id);
    const trackIndex = mockTracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    mockTracks.splice(trackIndex, 1);
  }
}
