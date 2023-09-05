import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from './hash-password';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { login, password } = createUserDto;

    let newUser = new User();
    const hashedPassword = await hashPassword(password);

    newUser = {
      ...newUser,
      login: login,
      password: hashedPassword,
    };

    const createdUser = await this.userRepository.save(newUser);

    delete createdUser.password;
    return {
      ...createdUser,
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

    const isPasswordValid = await compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }
    const newHashedPassword = await hashPassword(newPassword);
    user = {
      ...user,
      password: newHashedPassword,
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
