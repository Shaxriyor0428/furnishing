import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateImageDto {
  @ApiProperty({
    description: 'ID of the associated product',
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @ApiProperty({
    type: 'array',
    description: 'Array of image files (images)',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
  })
  @IsArray()
  @IsOptional()
  images: any[];
}
