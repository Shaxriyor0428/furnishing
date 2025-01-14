import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import axios from 'axios';
import * as fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'application/pdf', 'video/mp4', 'image/png', 'image/jpg', 'image/svg', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('Unsupported file type'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file or provide a URL',
    type: CreateFileDto,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ) {
    if (!file && !createFileDto.url) {
      throw new BadRequestException('Either a file or URL is required');
    }

    let fileData: {
      filename: string;
      originalname: string;
      path: string;
      mimetype: string;
    };

    if (createFileDto.url) {
      const url = createFileDto.url;
    
      try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
    
        const originalNameWithQuery = url.split('/').pop() || `file-${Date.now()}`;
        const originalName = originalNameWithQuery.split('?')[0]; 
        const filePath = join(__dirname, '..', '..', './uploads', originalName);
    
        await writeFile(filePath, response.data);
    
        fileData = {
          filename: originalName,
          originalname: originalName,
          path: filePath,
          mimetype: response.headers['content-type'],
        };
      } catch (error) {
        throw new BadRequestException('Invalid URL or unable to fetch file from URL');
      }
    }
    

    return this.fileService.create(fileData);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.download(filePath);
  }
}
