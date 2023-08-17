import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  GetCategoryResponse,
} from './category.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createCategory(
    @Body() data: CreateCategoryRequest,
  ): Promise<GetCategoryResponse> {
    const category = await this.categoryService.create(data);

    return category;
  }

  @Get()
  async getCategories(
  ): Promise<GetCategoryResponse[]> {
    const response = await this.categoryService.getAll();

    return response;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryRequest,
  ) {
    const category = await this.categoryService.getOneById(id);

    if (category === null) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryService.update(id, data);

    const updatedProduct= this.categoryService.getOneById(id);

    return updatedProduct;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteCategory(@Param('id') id: string) {
    const category = await this.categoryService.getOneById(id);

    if (category === null) {
      throw new NotFoundException('Category not found.');
    }

    await this.categoryService.delete(id);
  }
}
