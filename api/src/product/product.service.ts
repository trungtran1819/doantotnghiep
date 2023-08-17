import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";
import { CreateProductRequest, UpdateProductRequest } from "./product.dto";
import { uuid } from "uuidv4";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  createProduct(data: CreateProductRequest) {
    const product = this.productRepository.create({
      id: uuid(),
      ...data,
    });
    
    return this.productRepository.save(product);
  }

  async updateProduct(id: string, data: UpdateProductRequest) {
    await this.productRepository.update({ id }, data);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete({ id });
  }

  async getProducts() {
    const queryBuilder = this.productRepository
    .createQueryBuilder('product')
    .orderBy('product.created_at', 'DESC');

    return await queryBuilder.getMany();
  }

  getProductById(id: string) {
    return this.productRepository.findOneBy({ id });
  }
}