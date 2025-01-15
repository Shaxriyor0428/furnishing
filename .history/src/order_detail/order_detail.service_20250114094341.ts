import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order_detail.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
  ) {}
   async create(createOrderDetailDto: CreateOrderDetailDto) {
    const newOrderDetail = this.orderDetailRepo.create(createOrderDetailDto);
    await this.orderDetailRepo.save(newOrderDetail);
    return createApiResponse(
      201,
      'Order-Detail created successfully',
      newOrderDetail,
    );
  }

  async findAll() {
    const orderDetail = await this.orderAddressRepo.find({
      relations: [], // ['orders', 'product']
    });
    return createApiResponse(
      200,
      'List of order-Detail retrieved successfully',
      orderDetail,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
