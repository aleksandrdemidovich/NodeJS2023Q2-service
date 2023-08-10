import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class AuthService {
  async signUp(createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  async logIn(loginUserDto: CreateUserDto) {
    console.log(loginUserDto);
  }

  async refreshToken(refreshToken: string) {
    console.log(refreshToken);
  }
}
