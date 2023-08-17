import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;
}
