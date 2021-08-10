import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({});
  }

  async create(name: string): Promise<Category | undefined> {
    const nowDate = new Date().toISOString();

    return await this.categoryRepository.save({
      name,
      createdAt: nowDate,
      updatedAt: nowDate,
    });
  }
}
