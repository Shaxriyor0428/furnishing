import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'ID of the category the product belongs to', example: 101 })
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Name of the product', example: 'Wireless Headphones' })
  name?: string;

  @ApiPropertyOptional({ description: 'Detailed description of the product', example: 'High-quality wireless headphones with noise cancellation' })
  description?: string;

  @ApiPropertyOptional({ description: 'Price of the product', example: 199 })
  price?: number;

  @ApiPropertyOptional({ description: 'Average rating of the product', example: 4.5 })
  averageRating?: number;

  @ApiPropertyOptional({ description: 'Stock quantity of the product', example: 50 })
  stock?: number;

  @ApiPropertyOptional({
    description: 'Array of colors available for the product',
    example: ['red', 'blue', 'green'],
  })
  colors?: string[];

  @ApiPropertyOptional({ description: 'Stock Keeping Unit identifier', example: 'SKU-12345' })
  SKU?: string;

  @ApiPropertyOptional({
    description: 'Array of tags associated with the product',
    example: ['electronics', 'wireless', 'headphones'],
  })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Creation date of the product', example: '2024-01-01T00:00:00Z' })
  createdAt?: Date;

  @ApiPropertyOptional({ description: 'Last updated date of the product', example: '2024-01-15T00:00:00Z' })
  updatedAt?: Date;

}
