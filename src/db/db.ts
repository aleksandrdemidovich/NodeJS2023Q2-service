import { Album } from 'src/modules/albums/entities/album.entity';
import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Favorite } from 'src/modules/favorites/entities/favorite.entity';

export const mockUsers: User[] = [];
export const mockTracks: Track[] = [];
export const mockArtists: Artist[] = [];
export const mockAlbums: Album[] = [];
export const mockFavorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};
