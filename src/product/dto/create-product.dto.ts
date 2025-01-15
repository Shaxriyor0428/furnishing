import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'ID of the category the product belongs to', example: 101 })
  categoryId: number;

  @ApiProperty({ description: 'Name of the product', example: 'Wireless Headphones' })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the product',
    example: 'High-quality wireless headphones with noise cancellation',
  })
  description: string;

  @ApiProperty({ description: 'Price of the product', example: 199 })
  price: number;

  @ApiProperty({ description: 'Average rating of the product', example: 5 })
  averageRating: number;

  @ApiProperty({ description: 'Stock quantity of the product', example: 50 })
  stock: number;

  @ApiProperty({
    description: 'Array of colors available for the product',
    example: ['red', 'blue', 'green'],
  })
  colors: string[];

  @ApiProperty({ description: 'Stock Keeping Unit identifier', example: 'SKU-12345' })
  SKU: string;

  @ApiProperty({
    description: 'Array of tags associated with the product',
    example: ['electronics', 'wireless', 'headphones'],
  })
  tags: string[];

}
