import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({
    description: "Product rating",
    example: 4,
  })
  @IsNumber()
  readonly rating: number;

  @ApiProperty({
    description: "Product's ID",
    example: 1,
  })
  @IsNumber()
  readonly product_id: number;

  @ApiProperty({
    description: "Customer's ID",
    example: 3,
  })
  readonly customer_id: number;
}
