import { IsString, IsNumber } from "class-validator";

export enum OrderStatus {
  pending = 'Cho xu ly',
  delivering = 'Dang giao hang',
  completed = 'Hoan Thanh',
}

export class LineItem {
  @IsString()
  product: {
    id: string;
  }

  @IsNumber()
  quantity: number;
}

export class Customer {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  address: string;
}

export class CreateOrderRequest {
  items: LineItem[];
  customer: Customer;
}

export class UpdateOrderRequest {
  status: OrderStatus;
}

export class GetOrderResponse {
  id: string;
  items: LineItem[];
  customer: Customer;
  status: OrderStatus;
  note: string;
  created: Date;
  updated: Date;
}
