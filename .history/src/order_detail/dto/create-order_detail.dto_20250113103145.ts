import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../../order/entities/order.entity';

export class CreateOrderDetailDto {
  @ApiProperty({
    description: 'ID of the product in the order detail',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Order associated with this order detail',
    type: Order,
  })
  @ValidateNested()
  @Type(() => Order)
  @IsNotEmpty()
  orderId: Order;

  @ApiProperty({
    description: 'Quantity of the product in the order detail',
    type: Number,
    example: 2,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Price of the product in the order detail',
    type: Number,
    example: 100,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
