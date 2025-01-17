import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  
    @IsOptional()
    @IsString()
    @ApiProperty({
      description: 'The file name of the uploaded file',
      example: 'image.jpg',
      required: false,
    })
    filename?: string;
}
