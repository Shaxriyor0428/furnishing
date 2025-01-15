import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { OrderService } from '../order/order.service';

@Module({
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
   exports: [OrderService],
})
export class OrderDetailModule {}
