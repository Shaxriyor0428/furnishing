import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderAddressDto } from './dto/create-order_address.dto';
import { UpdateOrderAddressDto } from './dto/update-order_address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderAddress } from './entities/order_address.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';
import { PaginationDto } from '../admin/dto/pagination.dto';

@Injectable()
export class OrderAddressesService {
  constructor(
    @InjectRepository(OrderAddress)
    private readonly orderAddressRepo: Repository<OrderAddress>,
  ) {}
  async create(createOrderAddressDto: CreateOrderAddressDto) {
    const newOrderAddress = this.orderAddressRepo.create(createOrderAddressDto);
    await this.orderAddressRepo.save(newOrderAddress);
    return createApiResponse(201, 'Order-Address created successfully', {
      newOrderAddress,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const total = await this.orderAddressRepo.count();
    const calculatedSkip = (page - 1) * limit;
    const orderAddresses = await this.orderAddressRepo.find({
      skip: calculatedSkip,
      take: limit,
      relations: ['customer'], // ['orders', 'customer']
    });
    return createApiResponse(
      200,
      'List of order-addresses retrieved successfully',
      { orderAddresses, total, limit, page },
    );
  }

  async findOne(id: number) {
    const orderAddress = await this.orderAddressRepo.findOne({ where: { id } });
    if (!orderAddress) {
      throw new NotFoundException(`Order-Address with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Order-Address with id ${id} retrieved successfully`,
      { orderAddress },
    );
  }

  async update(id: number, updateOrderAddressDto: UpdateOrderAddressDto) {
    const existingOrderAddress = await this.orderAddressRepo.findOne({
      where: { id },
    });
    if (!existingOrderAddress) {
      throw new NotFoundException(`Order-Address with id ${id} not found`);
    }

    await this.orderAddressRepo.update(id, updateOrderAddressDto);
    const updatedOrderAddress = await this.orderAddressRepo.findOne({
      where: { id },
    });

    return createApiResponse(200, 'Order-Address updated successfully', {
      updatedOrderAddress,
    });
  }

  async remove(id: number) {
    const orderAddress = await this.orderAddressRepo.findOne({ where: { id } });
    if (!orderAddress) {
      throw new NotFoundException(`Order-Address with id ${id} not found`);
    }

    await this.orderAddressRepo.delete(id);
    return createApiResponse(
      200,
      `Order-Address with id ${id} removed successfully`,
    );
  }
}
