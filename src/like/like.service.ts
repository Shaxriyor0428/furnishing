import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Likes } from './entities/like.entity';
import { Customer } from '../customer/entities/customer.entity';
import { createApiResponse } from '../common/utils';
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

  async getProductLikes(customer_id: number) {
    const customer = await this.customerRepo.findOneBy({ id: customer_id });
    if (!customer) {
      throw new BadRequestException(`User with ID: ${customer_id} not found.`);
    }

    const likes = await this.likeRepo.find({
      where: { customerId: customer_id },
    });

    const productIds = likes.map((like) => like.productId);
    if (productIds.length === 0) {
      return createApiResponse(
        200,
        'No liked products found for the customer',
        {
          products: [],
        },
      );
    }

    const products = await this.productRepo.find({
      where: { id: In(productIds), is_liked: true },
    });
    return createApiResponse(200, 'All liked products for the customer', {
      products,
    });
  }
}
