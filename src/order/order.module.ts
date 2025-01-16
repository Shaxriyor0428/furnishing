import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from '../customer/entities/customer.entity';
import { OrderAddress } from '../order_addresses/entities/order_address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Customer, OrderAddress]),
    JwtModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
