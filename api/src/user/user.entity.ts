import {
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
} from 'typeorm';

export enum Roles {
  ADMIN = 'ADMIN',
};

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: Roles;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;
}
