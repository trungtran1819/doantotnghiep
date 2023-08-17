import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CreateCategoryRequest, UpdateCategoryRequest } from "./category.dto";
import { uuid } from "uuidv4";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>
  ) {}

  create(data: CreateCategoryRequest) {
    const item = this.repository.create({
      id: uuid(),
      ...data,
    });
    
    return this.repository.save(item);
  }

  async update(id: string, data: UpdateCategoryRequest) {
    await this.repository.update({ id }, data);
  }

  async delete(id: string) {
    await this.repository.delete({ id });
  }

  async getAll() {
    const queryBuilder = this.repository
    .createQueryBuilder('category')
    .orderBy('category.created_at', 'DESC');

    return await queryBuilder.getMany();
  }

  getOneById(id: string) {
    return this.repository.findOneBy({ id });
  }
}