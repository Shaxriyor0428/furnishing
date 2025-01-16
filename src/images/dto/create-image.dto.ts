import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({
    description: 'ID of the associated product',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    description: 'Array of image file paths or URLs',
    example: ['image1.png', 'image2.jpg', 'image3.webp'],
    nullable: true,
  })
  @IsOptional()
  @IsArray({ message: 'Images must be an array.' })
  @IsString({ each: true, message: 'Each image must be a string.' })
  images: string[];
}
