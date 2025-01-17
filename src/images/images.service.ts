import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { saveFile } from '../common/helpers/saveImage';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';
import { PaginationDto } from '../admin/dto/pagination.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async create(createImageDto: CreateImageDto, images: any) {
    const existsProduct = await this.productRepo.findOneBy({
      id: createImageDto.productId,
    });
    if (!existsProduct) {
      throw new NotFoundException(
        `Product with id ${createImageDto.productId} not found`,
      );
    }
    const fileNames = await Promise.all(
      images.map((image: any) => saveFile(image)),
    );
    const image = await this.imageRepo.save({
      ...createImageDto,
      images: fileNames,
    });
    return createApiResponse(201, 'Images created successfully', { image });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const total = await this.imageRepo.count();
    const calculatedSkip = (page - 1) * limit;
    const images = await this.imageRepo.find({
      skip: calculatedSkip,
      take: limit,
    });
    return createApiResponse(200, 'Images', {
      images,
      total,
      page,
      limit,
    });
  }

  async findOne(id: number) {
    const images = await this.imageRepo.findOne({ where: { id } });
    if (!images) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }
    return createApiResponse(200, 'Admin retrieved successfully', { images });
  }

  async update(id: number, updateImageDto: UpdateImageDto, images: any[]) {
    const existsImages = await this.imageRepo.findOne({
      where: { id },
    });
    if (!existsImages) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    let updatedImages = existsImages.images;
    if (images && images.length > 0) {
      updatedImages = await Promise.all(
        images.map((image: any) => saveFile(image)),
      );
    }

    await this.imageRepo.update(id, {
      ...updateImageDto,
      images: updatedImages,
    });

    const updatedImage = await this.imageRepo.findOne({ where: { id } });

    return createApiResponse(200, 'Image updated successfully', {
      image: updatedImage,
    });
  }

  async remove(id: number) {
    const images = await this.imageRepo.findOne({ where: { id } });
    if (!images) {
      throw new NotFoundException(`Image with id ${id} not found`);
    }

    await this.imageRepo.delete(id);
    return createApiResponse(200, 'Image removed successfully');
  }
}
