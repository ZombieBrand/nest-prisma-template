import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from './user/entities/user.entity';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { LoginDto } from './auth/dto/login.dto';
import { Public } from './common/decorators/public.decorator';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: '登陆账户' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Public() // 无需授权的路由
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiOkResponse({
    type: UserEntity,
  })
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return new UserEntity(await this.authService.getUserProfile(req.user));
  }
}
