import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';
import { LineItem, Customer, OrderStatus } from './order.dto';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb' })
  items: LineItem[];

  @Column({ type: 'jsonb' })
  customer: Customer;

  @Column({ default: OrderStatus.pending, enum: OrderStatus })
  status: OrderStatus;

  @Column({ default: '' })
  note: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;
}
