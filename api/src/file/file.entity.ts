import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'files' })
export class File {
  @PrimaryColumn()
  id: string;

  @Column()
  filename: string;

  @Column()
  type: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated: Date;
}
