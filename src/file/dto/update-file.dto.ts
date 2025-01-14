import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  
  
  @IsString()
  @ApiProperty({
    description: 'The url of the uploaded file',
    example: 'https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg?format=750w',  
  })
  url: string;
  
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
