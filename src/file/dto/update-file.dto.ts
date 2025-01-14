import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  
  @IsString()
  @ApiProperty({
    description: 'The filename of the uploaded file that is being updated.',
    example: 'updated-image.jpg',  
  })
  filename: string;

  @IsString()
  @ApiProperty({
    description: 'The original name of the uploaded file that is being updated.',
    example: 'updated-original-image.jpg',
  })
  originalname: string;

  @IsString()
  @ApiProperty({
    description: 'The path where the file is stored on the server that is being updated.',
    example: '/uploads/updated-image.jpg', 
  })
  path: string;

  @IsString()
  @ApiProperty({
    description: 'The MIME type of the file that is being updated.',
    example: 'image/png',
  })
  mimetype: string;
}
