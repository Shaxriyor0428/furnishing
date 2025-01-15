import { Injectable, NotFoundException } from '@nestjs/common';
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
    const orderDetail = await this.orderDetailRepo.find({
      relations: [], // ['orders', 'product']
    });
    return createApiResponse(
      200,
      'List of order-detail retrieved successfully',
      orderDetail,
    );
  }

  async findOne(id: number) {
    const orderDetail = await this.orderDetailRepo.findOne({ where: { id } });
    if (!orderDetail) {
      throw new NotFoundException(`Order-Detail with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Order-Detail with id ${id} retrieved successfully`,
      orderDetail,
    );
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const existingOrderDetail = await this.orderDetailRepo.findOne({
      where: { id },
    });
    if (!existingOrderDetail) {
      throw new NotFoundException(`Order-Detail with id ${id} not found`);
    }

    await this.orderDetailRepo.update(id, updateOrderDetailDto);
    const updatedOrderDetail = await this.orderDetailRepo.findOne({
      where: { id },
    });

    return createApiResponse(
      200,
      'Order-Detail updated successfully',
      updatedOrderDetail,
    );
  }

  async remove(id: number) {
    const orderAddress = await this.orderAddressRepo.findOne({ where: { id } });
    if (!orderAddress) {
      throw new NotFoundException(`Order-Address with id ${id} not found`);
    }

    await this.orderDetailRepo.delete(id);
    return createApiResponse(
      200,
      `Order-Address with id ${id} removed successfully`,
    );
  }
}
