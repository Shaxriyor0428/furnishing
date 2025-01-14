import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be uploaded.',
    example: 'image.jpg', 
    required:false
  })
  file?: any;

  @IsOptional()
  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'The url of the uploaded file',
    example: 'https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/e2e0e62f-0064-4f86-b9d8-5a55cb7110ca/Korembi-January-2024.jpg?format=750w',  
  })
  url?: string;

  @IsString()
  @ApiProperty({
    description: 'The filename of the uploaded file.',
    example: 'image.jpg',  
  })
  filename: string;

  @IsString()
  @ApiProperty({
    description: 'The original name of the uploaded file.',
    example: 'original-image.jpg', 
  })
  originalname: string;

  @IsString()
  @ApiProperty({
    description: 'The path where the file is stored on the server.',
    example: '/uploads/image.jpg', 
  })
  path: string;

  @IsString()
  @ApiProperty({
    description: 'The MIME type of the file.',
    example: 'image/jpeg', 
  })
  mimetype: string;
}
