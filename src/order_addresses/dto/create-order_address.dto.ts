import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderAddressDto {
  @ApiProperty({
    description: 'Customer ID',
    example: 1,
  })
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({
    description: 'Region',
    example: 'Region',
  })
  @IsNotEmpty()
  @IsString()
  readonly region: string;

  @ApiProperty({
    description: 'District',
    example: 'District',
  })
  @IsNotEmpty()
  @IsString()
  readonly district: string;

  @ApiProperty({
    description: 'Street',
    example: 'Street',
  })
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @ApiProperty({
    description: 'Zip Code',
    example: 'Zip Code',
  })
  @IsNotEmpty()
  @IsString()
  readonly zip_code: string;

  @ApiProperty({
    description: 'Additional Information',
    example: 'Additional Information',
  })
  @IsOptional()
  @IsString()
  readonly additional_information?: string;
}
