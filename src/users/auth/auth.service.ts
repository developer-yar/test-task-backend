import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { jwtConstants } from './strategy/constants';
import { User } from '../users/schema/user.schema';
import { UserService } from '../users/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: AuthUserDto): Promise<User> {
    const existingUser = await this.userService.getUserFromDB(user);
    if (existingUser) {
      return existingUser;
    }
    return null;
  }

  async createAccessToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
    };
    return this.jwtService.sign(payload);
  }

  async createRefreshToken(userId: string): Promise<string> {
    const payload = { id: userId, tokenId: uuid() };

    return this.jwtService.sign(payload, {
      expiresIn: jwtConstants.refresh_token_expiration,
    });
  }

  decodeRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async replaceRefreshToken(
    userId: string,
    oldTokenId: string,
  ): Promise<string> {
    ////////////////////////////////////// remove old token id
    return this.createRefreshToken(userId);
  }
}
