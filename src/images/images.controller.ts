import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from '../admin/dto/pagination.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { join } from 'path';
import { Response } from 'express';
import { Image } from './entities/image.entity';
import { AdminAccessTokenGuard } from '../common/guards/admin.access-token.guard';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Upload images' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image files',
    type: CreateImageDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Image created successfully',
    type: Image,
  })
  // @UseGuards(AdminAccessTokenGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif|avif/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Only image files are allowed to download!',
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFiles() images: any[],
  ) {
    return this.imagesService.create(createImageDto, images);
  }

  @ApiOperation({ summary: 'Get all images' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched images',
    type: [Image],
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.imagesService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched image',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Update image details',
    type: UpdateImageDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Image updated successfully',
  })
  // @UseGuards(AdminAccessTokenGuard)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png|gif|avif/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only image files allowed download'),
            false,
          );
        }
      },
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFiles() images: any[],
  ) {
    return this.imagesService.update(+id, updateImageDto, images);
  }

  @ApiOperation({ summary: 'Delete an image' })
  @ApiResponse({
    status: 200,
    description: 'Image removed successfully',
  })
  // @UseGuards(AdminAccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }

  @ApiOperation({ summary: 'Download an image by filename' })
  @ApiResponse({
    status: 200,
    description: 'Image downloaded successfully',
  })
  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.download(filePath);
  }
}
