import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './entities/payment.entity';

@ApiTags('OrderDetail')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
   @ApiOperation({ summary: 'Get all payment details' })
    @ApiResponse({
      status: 200,
      description: 'List of payment details',
      type: [Payment],
    })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
   @ApiOperation({ summary: 'Get payment detail by ID' })
    @ApiResponse({
      status: 200,
      description: 'Get payment detail by id retrived successfully',
      type: Payment,
    })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
   @ApiOperation({ summary: 'Update order detail by ID' })
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: 200,
      description: 'Order detail updated successfully',
      type: OrderDetail,
    })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
