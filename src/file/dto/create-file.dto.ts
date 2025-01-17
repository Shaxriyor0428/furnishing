import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be uploaded.',
    example: 'image.jpg',
    required: false,
  })
  file?: any;


  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The file name of the uploaded file',
    example: 'image.jpg',
    required: false,
  })
  filename?: string;
}
