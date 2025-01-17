import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsIn,
  IsNumber,
} from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;
}
