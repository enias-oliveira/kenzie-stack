import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersServices: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersServices.findOne(username);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      delete user.password;
      return user;
    }
    return null;
  }

  login(user: User): { access_token: string } {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
