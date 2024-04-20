import * as bcrypt from 'bcrypt';
import RegisterDto from './dto/register.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configServce: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userService.createByUser({
        ...registrationData,
        password: hashPassword,
      });
      createdUser.password = hashPassword;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getAuthenticatedUser(email: string, plainTextPasswrod: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPasswrod, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPasswrod: string,
    hashPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPasswrod,
      hashPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configServce.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
  }
}
