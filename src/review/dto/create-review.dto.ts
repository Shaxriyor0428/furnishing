import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    description: 'Readonly comment field',
    type: String,
    readOnly: true,
    example: 'This is a readonly comment',
  })
  @IsString()
  readonly comment: string;
}
