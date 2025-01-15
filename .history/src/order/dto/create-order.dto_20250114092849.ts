import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '../../common/types/order_status';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the customer placing the order',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  customerId: number;

  @ApiProperty({
    description: 'The ID of the order address',
    type: Number,
    example: 101,
  })
  @IsNotEmpty()
  @IsNumber()
  orderAdressId: number;

  @ApiProperty({
    description: 'The status of the order',
    enum: OrderStatus,
    example: OrderStatus.NEW,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({
    description: 'The total amount of the order',
    type: Number,
    example: 150.75,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total_amount: number;

  @ApiProperty({
    description: 'The date when the order was placed',
    type: String,
    format: 'date-time',
    example: '2025-01-13T12:00:00Z',
  })
  @IsNotEmpty()
  @Type()
  @IsDate()
  order_date: Date;
}
