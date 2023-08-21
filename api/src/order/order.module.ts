import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { CategoryController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity]), AuthModule, UserModule, ProductModule],
  controllers: [CategoryController],
  providers: [OrderService, ProductService],
})

export class OrderModule {}
