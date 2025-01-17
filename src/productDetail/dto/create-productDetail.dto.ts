import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateProductDetailDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsInt()
  @IsPositive()
  readonly productId: number;

  @ApiProperty({ description: 'Width in cm', example: 45.5 })
  @IsNumber()
  @IsPositive()
  readonly withCm: number;

  @ApiProperty({ description: 'Height in cm', example: 90.2 })
  @IsNumber()
  @IsPositive()
  readonly heghtCm: number;

  @ApiProperty({ description: 'Depth in cm', example: 30.4 })
  @IsNumber()
  @IsPositive()
  readonly depthCm: number;

  @ApiProperty({ description: 'Weight in kg', example: 12.5 })
  @IsNumber()
  @IsPositive()
  readonly weightKg: number;

  @ApiProperty({ description: 'Seat height in cm', example: 45.0 })
  @IsNumber()
  @IsPositive()
  readonly seatHeightCm: number;

  @ApiProperty({ description: 'Leg height in cm', example: 20.0 })
  @IsNumber()
  @IsPositive()
  readonly legHeightCm: number;

  @ApiProperty({ description: 'Country of origin', example: 'Italy' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly countryOrigin: string;

  @ApiProperty({
    description: 'Array of tags associated with the product',
    example: [101, 102, 103],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  readonly tags: number[];

  @ApiProperty({ description: 'Capacity of the product', example: 4 })
  @IsInt()
  @IsPositive()
  readonly capacity: number;

  @ApiProperty({ description: 'Warranty period in months', example: 24 })
  @IsInt()
  @Min(0)
  readonly warranty: number;

  @ApiProperty({ description: 'Maximum load capacity in kg', example: 150 })
  @IsNumber()
  @IsPositive()
  readonly maxLoadCapacity: number;

  @ApiProperty({
    description: 'Primary material of the product',
    example: 'Wood',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly material: string;

  @ApiProperty({
    description: 'Filling material of the product',
    example: 'Foam',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly fillingMaterial: string;

  @ApiProperty({
    description: 'Upholstery material of the product',
    example: 'Leather',
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly upholsteryMaterial: string;
}
