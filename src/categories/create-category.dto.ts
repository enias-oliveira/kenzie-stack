import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: '$property: Invalid value',
  })
  name: string;
}
