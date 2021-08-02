import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User, UsersService } from 'src/users/users.service';

@Controller('')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('users')
  signup(@Body() userData: User): Promise<User> {
    return this.usersService.create(userData.username, userData.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): {
    access_token: string;
  } {
    return this.authService.login(req);
  }
}
