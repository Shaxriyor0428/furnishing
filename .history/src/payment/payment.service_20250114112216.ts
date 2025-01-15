import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const newPayment = this.paymentRepo.create(createPaymentDto);
    await this.paymentRepo.save(newPayment);
    return createApiResponse(201, 'Payment created successfully', newPayment);
  }
  async findAll() {
    const payment = await this.paymentRepo.find({
      relations: ['order'], // ['orders']
    });
    return createApiResponse(
      200,
      'List of payment retrieved successfully',
      payment,
    );
  }
  async findOne(id: number) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Payment with id ${id} retrieved successfully`,
      payment,
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

    return createApiResponse(
      200,
      'Order-Address updated successfully',
      updatedOrderAddress,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
