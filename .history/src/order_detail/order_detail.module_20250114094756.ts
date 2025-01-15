import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { OrderService } from '../order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDeta]), JwtModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
   exports: [OrderService],
})
export class OrderDetailModule {}
