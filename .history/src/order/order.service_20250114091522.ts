import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = this.orderRepo.create(createOrderDto);
    await this.orderRepo.save(newOrder);
    return createApiResponse(201, 'Order created successfully', newOrder);
  }

  async findAll() {
    const order = await this.orderRepo.find({
      relations: [], // ['orderAddress', 'customer']
    });
    return createApiResponse(
      200,
      'List of orders retrieved successfully',
      order,
    );
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Order with id ${id} retrieved successfully`,
      order,
    );
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const existingOrder = await this.orderRepo.findOne({
      where: { id },
    });
    if (!existingOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.orderRepo.update(id, updateOrderDto);
    const updatedOrder = await this.orderRepo.findOne({
      where: { id },
    });

    return createApiResponse(200, 'Order updated successfully', updatedOrder);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.orderRepo.delete(id);
    return createApiResponse(200, `Order with id ${id} removed successfully`);
  }
}
