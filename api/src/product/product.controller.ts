import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductRequest,
  UpdateProductRequest,
  GetProductResponse,
} from './product.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() data: CreateProductRequest,
  ): Promise<GetProductResponse> {
    const product = await this.productService.createProduct(data);

    return product;
  }

  @Get()
  async getProducts(
  ): Promise<GetProductResponse[]> {
    const response = await this.productService.getProducts();

    return response;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<GetProductResponse> {
    const product = await this.productService.getProductById(id);

    if (product === null) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductRequest,
  ) {
    const product = await this.productService.getProductById(id);

    if (product === null) {
      throw new NotFoundException('Product not found');
    }

    await this.productService.updateProduct(id, data);

    const updatedProduct= this.productService.getProductById(id);

    return updatedProduct;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);

    if (product === null) {
      throw new NotFoundException('Product not found');
    }

    await this.productService.deleteProduct(id);
  }
}
