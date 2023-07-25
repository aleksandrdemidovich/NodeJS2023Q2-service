import {
  IsNotEmpty,
  IsDefined,
  IsString,
  Length,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsDefined()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
