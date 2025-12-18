import { Body, Controller, Post, Res } from '@nestjs/common';

import { createuserdto } from 'src/dto/user.dto';
import { logindto } from 'src/dto/login.dto';
import { UserMongoService } from './usermongo.service';
import type { Response } from 'express';

@Controller('user')
export class UserMongoController {
  constructor(private readonly appService: UserMongoService) {}

  @Post()
  Createuser(@Body() dto: createuserdto) {
    return this.appService.create(dto);
  }

  // @Post('login')
  // userlogin(@Body() dto: logindto) {
  //   return this.appService.login(dto);
  // }

  @Post('login')
  async userlogin(
    @Body() dto: logindto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.appService.login(dto);

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        redirect: '/login',
      };
    }

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 2 * 60 * 1000,
    });

    res.cookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      success: true,
      message: 'Login successful',
      redirect: '/Organisationlist',
    };
  }
}
