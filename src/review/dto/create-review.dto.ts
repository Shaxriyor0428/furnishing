import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'The ID of the customer writing the review',
    example: 1,
  })
  @IsInt({ message: 'customerId must be an integer' })
  @IsPositive({ message: 'customerId must be a positive number' })
  @IsNotEmpty({ message: 'customerId is required' })
  readonly customerId: number;

  @ApiProperty({
    description: 'The ID of the product being reviewed',
    example: 42,
  })
  @IsInt({ message: 'productId must be an integer' })
  @IsPositive({ message: 'productId must be a positive number' })
  @IsNotEmpty({ message: 'productId is required' })
  readonly productId: number;

  readonly comment: string;
}
