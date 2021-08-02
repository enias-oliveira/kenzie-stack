import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from './users.entity';

export type User = {
  userId: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }

  async create(username: string, password: string): Promise<User> {
    const nowDate = new Date().toISOString();

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    return await this.userRepository.save({
      username,
      password: hashedPassword,
      createdAt: nowDate,
      updatedAt: nowDate,
    });
  }
}
