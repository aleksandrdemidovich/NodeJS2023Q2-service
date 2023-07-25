import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsDefined, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  newPassword: string;
}
