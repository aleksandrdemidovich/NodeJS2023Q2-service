import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const user = await this.userService.create({
      login,
      password,
    });

    return {
      message: 'User registered successfully',
      id: user.id,
      user,
    };
  }

  async logIn(loginUserDto: CreateUserDto) {
    const { login, password } = loginUserDto;

    const user = await this.userService.findOneByLogin(login);

    const isPasswordValid = await compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id, user.login);
    const refreshToken = this.generateRefreshToken(user.id, user.login);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        'Refresh token is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const res = await this.jwtService.verify(refreshToken);
      if (Math.round(new Date().getTime() / 1000) - res.exp < 0) {
        const payload = { login: res.login, userId: res.userId };
        return {
          accessToken: this.jwtService.sign(payload),
          refreshToken: this.jwtService.sign(payload, { expiresIn: '1m' }),
        };
      }
    } catch (err) {
      throw new HttpException(
        'Refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private generateAccessToken(userId: string, login: string): string {
    const payload = { userId, login };
    return this.jwtService.sign(payload, {
      expiresIn: jwtConstants.expiresIn,
    });
  }

  private generateRefreshToken(userId: string, login: string): string {
    const payload = { userId, login };
    return this.jwtService.sign(payload, {
      expiresIn: jwtConstants.refreshExpiresIn,
    });
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }
    const isUserPasswordMatch = await compare(pass, user.password);

    if (user && isUserPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
