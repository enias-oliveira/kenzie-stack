import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

export type User = {
  userId: number;
  username: string;
  pasword: string;
  updateAt: Date;
  createAt: Date;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ username });
  }
}
