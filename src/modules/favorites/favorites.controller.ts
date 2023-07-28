import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IsUUID } from 'class-validator';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @IsUUID()
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @IsUUID()
  @HttpCode(204)
  removeTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrackFromFavs(id);
  }

  @Post('album/:id')
  @IsUUID()
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @IsUUID()
  @HttpCode(204)
  removeAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbumFromFavs(id);
  }

  @Post('artist/:id')
  @IsUUID()
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @IsUUID()
  @HttpCode(204)
  removeArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtistFromFavs(id);
  }
}
