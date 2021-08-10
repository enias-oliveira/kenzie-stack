import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    userData: CreateUserDto,
  ): Promise<Omit<User, 'password'> | Error> {
    const { username, password } = userData;

    try {
      const user = await this.authService.validateUser(username, password);
      return user;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
