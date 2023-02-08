import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local/local-auth.guard';
import { UserLoginDto } from './users/dto/user-login.dto';
import { UserDto } from './users/dto/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }
}
