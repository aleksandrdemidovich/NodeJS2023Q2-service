import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mockAlbums, mockArtists, mockFavorites, mockTracks } from 'src/db/db';
import { validateId } from 'src/shared/utils/uuidUtils';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  findAll() {
    const artists: Artist[] = [];
    const albums: Album[] = [];
    const tracks: Track[] = [];

    for (const id of mockFavorites.artists) {
      const artist = mockArtists.find((artist) => artist.id === id);
      if (artist) {
        artists.push(artist);
      }
    }

    for (const id of mockFavorites.albums) {
      const album = mockAlbums.find((album) => album.id === id);
      if (album) {
        albums.push(album);
      }
    }

    for (const id of mockFavorites.tracks) {
      const track = mockTracks.find((track) => track.id === id);
      if (track) {
        tracks.push(track);
      }
    }

    return { artists, albums, tracks };
  }

  addTrackToFavs(id: string) {
    validateId(id);
    const track = mockTracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.tracks.push(track.id);
    return track;
  }

  removeTrackFromFavs(id: string) {
    validateId(id);
    const trackIndex = mockFavorites.tracks.indexOf(id);

    if (trackIndex === -1) {
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.tracks.splice(trackIndex, 1);
  }

  addAlbumToFavs(id: string) {
    validateId(id);
    const album = mockAlbums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.albums.push(album.id);
    return album;
  }

  removeAlbumFromFavs(id: string) {
    validateId(id);
    const albumIndex = mockFavorites.albums.indexOf(id);

    if (albumIndex === -1) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.albums.splice(albumIndex, 1);
  }

  addArtistToFavs(id: string) {
    validateId(id);
    const artist = mockArtists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.artists.push(artist.id);
    return artist;
  }

  removeArtistFromFavs(id: string) {
    validateId(id);
    const artistIndex = mockFavorites.artists.indexOf(id);
    if (artistIndex === -1) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    mockFavorites.artists.splice(artistIndex, 1);
  }
}
