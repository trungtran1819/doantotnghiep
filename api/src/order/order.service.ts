import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";
import { CreateOrderRequest, UpdateOrderRequest } from "./order.dto";
import { uuid } from "uuidv4";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>
  ) {}

  create(data: CreateOrderRequest) {
    const item = this.repository.create({
      id: uuid(),
      ...data,
    });
    
    return this.repository.save(item);
  }

  async update(id: string, data: UpdateOrderRequest) {
    await this.repository.update({ id }, data);
  }

  async delete(id: string) {
    await this.repository.delete({ id });
  }

  async getAll() {
    const queryBuilder = this.repository
    .createQueryBuilder('order')
    .orderBy('order.created_at', 'DESC');

    return await queryBuilder.getMany();
  }

  getOneById(id: string) {
    return this.repository.findOneBy({ id });
  }
}