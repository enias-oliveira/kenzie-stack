import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Category } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @UsePipes(new ValidationPipe({ errorHttpStatusCode: 422 }))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | undefined> {
    return await this.categoriesService.create(createCategoryDto.name);
  }
}
