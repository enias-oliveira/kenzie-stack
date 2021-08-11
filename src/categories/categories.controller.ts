import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Param,
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

  @UsePipes(new ValidationPipe({ errorHttpStatusCode: 422 }))
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(
    @Body() createCategoryDto: CreateCategoryDto,
    @Param('id') id,
  ): Promise<Category | undefined> {
    const targetCategory = await this.categoriesService.find(Number(id));
    targetCategory.name = createCategoryDto.name;
    return await this.categoriesService.update(targetCategory);
  }
}
