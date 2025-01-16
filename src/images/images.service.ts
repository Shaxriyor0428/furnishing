import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { saveFile } from '../common/helpers/saveImage';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imageRepo: Repository<Image>) {}
  async create(createImageDto: CreateImageDto, images: any) {
    const fileNames = await Promise.all(
      images.map((image: any) => saveFile(image)),
    );
    const image = await this.imageRepo.save({
      ...createImageDto,
      images: fileNames,
    });
    return createApiResponse(201, 'Images created successfully', { image });
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
