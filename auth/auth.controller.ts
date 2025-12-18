import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwt: JwtService) {}
  @Get('check')
  check(@Req() req) {
    const token = req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = this.jwt.verify(token, { secret: 'secret123' });
      console.log(' Token valid check true :', decoded);

      return { auth: true };
    } catch (e) {
      console.log('error', e.message);
      throw new UnauthorizedException();
    }
  }

  @Post('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return { success: false, message: 'No refresh token' };
    }

    try {
      const decoded = this.jwt.verify(refreshToken, { secret: 'secret123' });

      console.log(decoded);

      const payload = { id: decoded.id, email: decoded.email };

      // New access token
      const newAccessToken = this.jwt.sign(payload, { expiresIn: '2m' });
      console.log('Access token after 2mins', newAccessToken);
      // Set fresh access token cookie
      res.cookie('access_token', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 2 * 60 * 1000,
      });

      return { success: true, message: 'New access token created' };
    } catch (e) {
      return { success: false, message: 'Invalid refresh token' };
    }
  }

  @Get('publiccheck')
  publiccheck(@Req() req) {
    const token = req.cookies?.refresh_token;

    console.log('refresh_tokenn:', token);
    return token ? { auth: true } : { auth: false };
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { success: true, message: 'Logged out successfully' };
  }
}
