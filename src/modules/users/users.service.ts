import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mockUsers } from 'src/db/db';
import { v4 } from 'uuid';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto): Omit<User, 'password'> {
    const newUser: User = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    mockUsers.push(newUser);

    const { password, ...userWithoutPass } = newUser;

    return userWithoutPass;
  }

  findAll(): Omit<User, 'password'>[] {
    return mockUsers.map(({ password, ...rest }) => rest);
  }

  findOne(id: string): Omit<User, 'password'> {
    const user = mockUsers.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (!oldPassword || !newPassword) {
      throw new HttpException(
        'Old password and new password are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = mockUsers.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  remove(id: string) {
    const userIndex = mockUsers.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    mockUsers.splice(userIndex, 1);
  }
}
