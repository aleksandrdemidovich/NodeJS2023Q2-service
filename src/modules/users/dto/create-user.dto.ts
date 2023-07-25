import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  login: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
