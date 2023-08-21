import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  private async getEntitiesByIds<T>(
    entityName: string,
    ids: string[],
  ): Promise<T[]> {
    const repository =
      this.favoriteRepository.manager.getRepository(entityName);
    const entities = await repository.findBy({ id: In(ids) });
    return entities as T[];
  }
  async findAll() {
    const tracks = await this.favoriteRepository.find({
      where: {
        trackId: Not(IsNull()),
      },
    });
    const albums = await this.favoriteRepository.find({
      where: {
        albumId: Not(IsNull()),
      },
    });
    const artists = await this.favoriteRepository.find({
      where: {
        artistId: Not(IsNull()),
      },
    });

    const tracksIds = tracks.map((track) => track.trackId);
    const albumsIds = albums.map((album) => album.albumId);
    const artistsIds = artists.map((artist) => artist.artistId);

    const tracksResult = await this.getEntitiesByIds<Track>('Track', tracksIds);
    const albumsResult = await this.getEntitiesByIds<Album>('Album', albumsIds);
    const artistsResult = await this.getEntitiesByIds<Artist>(
      'Artist',
      artistsIds,
    );

    return {
      tracks: tracksResult,
      albums: albumsResult,
      artists: artistsResult,
    };
  }

  async addTrackToFavs(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    const favsTrack = await this.favoriteRepository.findOne({
      where: {
        trackId: id,
      },
    });

    if (!track) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (track && !favsTrack) {
      const createdFavoriteTrack = this.favoriteRepository.create({
        trackId: id,
      });
      return await this.favoriteRepository.save(createdFavoriteTrack);
    }
  }

  async removeTrackFromFavs(id: string) {
    const track = await this.favoriteRepository.findOne({
      where: {
        trackId: id,
      },
    });

    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete(track.id);
  }

  async addAlbumToFavs(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    const favoriteAlbum = await this.favoriteRepository.findOne({
      where: { albumId: id },
    });

    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (album && !favoriteAlbum) {
      const createdFavoriteAlbum = this.favoriteRepository.create({
        albumId: id,
      });
      return await this.favoriteRepository.save(createdFavoriteAlbum);
    }
  }

  async removeAlbumFromFavs(id: string) {
    const album = await this.favoriteRepository.findOne({
      where: { albumId: id },
    });

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete(album.id);
  }

  async addArtistToFavs(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    const favoriteArtist = await this.favoriteRepository.findOne({
      where: { artistId: id },
    });

    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (artist && !favoriteArtist) {
      const createdFavoriteArtist = this.favoriteRepository.create({
        artistId: id,
      });
      return await this.favoriteRepository.save(createdFavoriteArtist);
    }
  }

  async removeArtistFromFavs(id: string) {
    const artist = await this.favoriteRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete(artist.id);
  }
}
