import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';
import { PaginationDto } from '../admin/dto/pagination.dto';
import { Customer } from '../customer/entities/customer.entity';
import { OrderDto } from './dto/order.dto';
import { OrderAddressesService } from '../order_addresses/order_addresses.service';
import { OrderDetailService } from '../order_detail/order_detail.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly orderAddressService: OrderAddressesService,
    private readonly orderDetailService: OrderDetailService,
  ) {}
  async create(orderDto: OrderDto) {
    const { address, customerId, order_details, total_price } = orderDto;
    console.log(orderDto);

    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    const new_address = await this.orderAddressService.create({
      ...address,
      customer_id: customerId,
    });

    if (!new_address) {
      throw new BadRequestException('Error on creating address');
    }

    const order = await this.orderRepo.save({
      customerId,
      orderAddressId: new_address?.id,
      total_price: Number(total_price),
    });

    if (!order) {
      throw new BadRequestException('Error on creating order');
    }

    const new_order_details = await Promise.all(
      order_details.map(async (order_detail) => {
        return this.orderDetailService.create({
          ...order_detail,
          orderId: order?.id,
        });
      }),
    );
    if (!new_order_details) {
      throw new BadRequestException('Error on creating order details');
    }
    const result = {
      order,
      new_address,
      order_details: new_order_details,
    };
    return createApiResponse(201, 'Order created successfully', { result });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const calculatedSkip = (page - 1) * limit;
    const total = await this.orderRepo.count();

    const orders = await this.orderRepo.find({
      relations: [
        'order_address',
        'customer',
        'order_details',
        'order_details.product',
      ],
      select: {
        customer: {
          first_name: true,
          last_name: true,
          phone_number: true,
          email: true,
        },
        order_address: {
          additional_information: true,
          district: true,
          region: true,
          street: true,
          zip_code: true,
        },
        order_details: {
          quantity: true,
          productId: true,
          product: {
            name: true,
            price: true,
          },
        },
      },
      skip: calculatedSkip,
      take: limit,
    });

    return createApiResponse(200, 'List of orders retrieved successfully', {
      orders,
      total,
      limit,
      page,
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Order with id ${id} retrieved successfully`,
      { order },
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

    return createApiResponse(200, 'Order updated successfully', {
      updatedOrder,
    });
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
