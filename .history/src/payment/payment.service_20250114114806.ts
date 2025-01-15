import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
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

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.paymentRepo.findOne({
      where: { id },
    });
    if (!existingPayment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }

    await this.paymentRepo.update(id, updatePaymentDto);
    const updatedPayment = await this.paymentRepo.findOne({
      where: { id },
    });

    return createApiResponse(
      200,
      'Payment updated successfully',
      updatedPayment,
    );
  }

  async remove(id: number) {
    const payment = await this.paymentRepo.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    await this.paymentRepo.delete(id);
    return createApiResponse(200, `Payment with id ${id} removed successfully`);
  }
}
