import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Likes } from './entities/like.entity';
import { Customer } from '../customer/entities/customer.entity';
import { createApiResponse } from '../common/utils';
import { PaginationDto } from '../admin/dto/pagination.dto';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Likes) private readonly likeRepo: Repository<Likes>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async toggleLike(createLikeDto: CreateLikeDto) {
    const { customerId, productId } = createLikeDto;

    const existingLike = await this.likeRepo.findOne({
      where: { customerId, productId },
    });

    if (existingLike) {
      await this.likeRepo.remove(existingLike);
      return createApiResponse(200, 'Like removed successfully', {
        existingLike,
      });
    } else {
      const customer = await this.customerRepo.findOne({
        where: { id: customerId },
      });
      if (!customer) {
        throw new NotFoundException(`Customer with id ${customerId} not found`);
      }

      const product = await this.productRepo.findOne({
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      const newLike = this.likeRepo.create(createLikeDto);
      await this.likeRepo.save(newLike);
      return createApiResponse(201, 'Like created successfully', { newLike });
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;
    const calculatedSkip = (page - 1) * limit;
    const total = await this.likeRepo.count();
    const like = await this.likeRepo.find({
      relations: ['customer', 'product'], // ['product', 'customer']
      skip: calculatedSkip,
      take: limit,
    });
    return createApiResponse(200, 'List of likes retrieved successfully', {
      like,
      total,
      limit,
      page,
    });
  }

  async findOne(id: number) {
    const like = await this.likeRepo.findOne({
      where: { id },
      relations: ['customer', 'product'],
    });
    if (!like) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }
    return createApiResponse(200, `Like with id ${id} retrieved successfully`, {
      like,
    });
  }

  async update(id: number, updateLikeDto: UpdateLikeDto) {
    const existingLike = await this.likeRepo.findOne({
      where: { id },
    });
    if (!existingLike) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }
    await this.likeRepo.update(id, updateLikeDto);
    const updatedLike = await this.likeRepo.findOne({
      where: { id },
    });

    return createApiResponse(200, 'Like updated successfully', {
      updatedLike,
    });
  }

  async remove(id: number) {
    const like = await this.likeRepo.findOne({ where: { id } });
    if (!like) {
      throw new NotFoundException(`Like with id ${id} not found`);
    }
    await this.likeRepo.delete(id);
    return createApiResponse(200, `Like with id ${id} removed successfully`);
  }

  async getProductLikes(product_id: number) {
    const likes = await this.likeRepo.find({
      where: { productId: product_id },
    });
    return createApiResponse(200, 'All likes product', { likes });
  }
}
