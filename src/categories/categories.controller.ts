import { Body, Controller, Post } from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto.name);
  }
}
