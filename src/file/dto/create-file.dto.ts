import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFileDto {

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'The file to be uploaded.',
    example: 'image.jpg', 
  })
  file?: any;

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
