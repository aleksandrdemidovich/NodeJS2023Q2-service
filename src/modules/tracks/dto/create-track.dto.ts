import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { IsStringOrNull } from '../../../validators/is-null.validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsStringOrNull()
  artistId: string | null; // refers to Artist

  @IsStringOrNull()
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
