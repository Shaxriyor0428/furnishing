import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDetailDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  productId: number;

  @ApiProperty({ description: 'Width in cm', example: 45.5 })
  withCm: number;

  @ApiProperty({ description: 'Height in cm', example: 90.2 })
  heghtCm: number;

  @ApiProperty({ description: 'Depth in cm', example: 30.4 })
  depthCm: number;

  @ApiProperty({ description: 'Weight in kg', example: 12.5 })
  weightKg: number;

  @ApiProperty({ description: 'Seat height in cm', example: 45.0 })
  seatHeightCm: number;

  @ApiProperty({ description: 'Leg height in cm', example: 20.0 })
  legHeightCm: number;

  @ApiProperty({ description: 'Country of origin', example: 'Italy' })
  countryOrigin: string;

  @ApiProperty({ description: 'Array of tags associated with the product', example: [101, 102, 103] })
  tags: number[];

  @ApiProperty({ description: 'Capacity of the product', example: 4 })
  capacity: number;

  @ApiProperty({ description: 'Warranty period in months', example: 24 })
  warranty: number;

  @ApiProperty({ description: 'Maximum load capacity in kg', example: 150 })
  maxLoadCapacity: number;

  @ApiProperty({ description: 'Primary material of the product', example: 'Wood' })
  material: string;

  @ApiProperty({ description: 'Filling material of the product', example: 'Foam' })
  fillingMaterial: string;

  @ApiProperty({ description: 'Upholstery material of the product', example: 'Leather' })
  upholsteryMaterial: string;
}
