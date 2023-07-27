import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }


  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeTrackFromFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }


  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeAlbumFromFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavs(id);
  }


  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavs(@Param('id') id: string) {
    return this.favoritesService.removeArtistFromFavs(id);
  }
}
