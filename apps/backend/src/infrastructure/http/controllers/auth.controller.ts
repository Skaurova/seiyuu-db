import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { FakeAuthService } from '../../../faker/auth/fake-auth.service';
import { LoginDto } from '../../../core/auth/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: FakeAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);

    res.cookie('seiyuudb_auth', user.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 2,
    });

    return {
      token: '',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        active: user.active,
        lastLogin: user.lastLogin?.toISOString() ?? null,
        roleId: user.roleId,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('seiyuudb_auth');
    return { success: true };
  }
}
