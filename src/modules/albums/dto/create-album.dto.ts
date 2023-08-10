import { IsNotEmpty, IsString, IsNumber, IsDefined } from 'class-validator';
import { IsStringOrNull } from 'src/validators/is-null.validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  year: number;

  @IsStringOrNull()
  artistId: string | null; // refers to Artist
}
