import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { CategoryController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), AuthModule, UserModule],
  controllers: [CategoryController],
  providers: [OrderService],
})

export class OrderModule {}
