import { Controller, UseGuards, Res, Req, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { jwtConstants } from './strategy/constants';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async login(@Req() req, @Res() res: Response) {
    const accessToken: string = await this.authService.createAccessToken(
      req.user.id,
    );

    const refreshToken: string = await this.authService.createRefreshToken(
      req.user.id,
    );

    res.cookie(jwtConstants.refresh_token_cookie_name, refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({ accessToken, user: req.user });
  }

  @Post('api/refresh-token')
  async rotateRefreshToken(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const oldRefreshToken = req.cookies[jwtConstants.refresh_token_cookie_name];

    const decodedToken = this.authService.decodeRefreshToken(oldRefreshToken);

    const newRefreshToken = await this.authService.replaceRefreshToken(
      decodedToken.id,
      decodedToken.tokenId,
    );

    const newAccessToken = await this.authService.createAccessToken(
      decodedToken.id,
    );

    res.cookie(jwtConstants.refresh_token_cookie_name, newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({ accessToken: newAccessToken });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
