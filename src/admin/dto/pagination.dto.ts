import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  limit?: number;
}
