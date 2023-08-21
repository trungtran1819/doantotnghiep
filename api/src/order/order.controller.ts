import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
  GetOrderResponse,
} from './order.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProductService } from 'src/product/product.service';

@Controller('orders')
export class CategoryController {
  constructor(
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createOrder(
    @Body() data: CreateOrderRequest,
  ): Promise<GetOrderResponse> {
    const order = await this.orderService.create(data);

    const { items } = order;

    await Promise.all(items.map(async (item) => {
      const product = await this.productService.getProductById(item.product.id);
      const stock = product.stock - item.quantity < 0 ? 0 : product.stock - item.quantity;
      await this.productService.updateProduct(item.product.id, { stock });
    }));

    return order;
  }

  @Get()
  @UseGuards(AuthGuard)
  async getOrders(): Promise<GetOrderResponse[]> {
    const response = await this.orderService.getAll();

    return response;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateOrder(@Param('id') id: string, @Body() data: UpdateOrderRequest) {
    const order = await this.orderService.getOneById(id);

    if (order === null) {
      throw new NotFoundException('Order not found');
    }

    await this.orderService.update(id, data);

    const updatedOrder = this.orderService.getOneById(id);

    return updatedOrder;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    const order = await this.orderService.getOneById(id);

    if (order === null) {
      throw new NotFoundException('Order not found');
    }

    await this.orderService.delete(id);
  }
}
