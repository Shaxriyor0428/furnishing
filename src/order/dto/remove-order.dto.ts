import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RemoveOrderDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => Number)
  @IsNumber()
  address_id: number;

  @Type(() => Number)
  @IsNumber()
  order_detail_id: number;
}
