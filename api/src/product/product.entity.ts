import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  images: string[];

  @Column({ type: 'int' })
  unitPrice: number;

  @Column({ type: 'int', nullable: true })
  stock: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;
}
