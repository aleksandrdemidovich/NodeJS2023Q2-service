import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(album, updateAlbumDto);
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    await this.albumRepository.delete(id);
  }
}
