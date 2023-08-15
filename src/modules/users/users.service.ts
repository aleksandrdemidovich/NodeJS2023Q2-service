import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    //TODO add hash password
    let newUser = new User();
    newUser = { ...newUser, ...createUserDto };
    await this.userRepository.save(newUser);
    delete newUser.password;
    return {
      ...newUser,
      createdAt: +newUser.createdAt,
      updatedAt: +newUser.updatedAt,
    };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ login });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }
    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    let user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    user = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: new Date(),
    };

    await this.userRepository.save(user);
    delete user.password;

    return { ...user, createdAt: +user.createdAt, updatedAt: +user.updatedAt };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
  }
}
