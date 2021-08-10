import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User, UsersService } from 'src/users/users.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('users')
  signup(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData.username, userData.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Omit<User, 'password'>): {
    access_token: string;
  } {
    return { access_token: this.authService.login(req) };
  }
}
