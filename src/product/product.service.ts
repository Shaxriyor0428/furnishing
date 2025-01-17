import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from 'src/admin/dto/pagination.dto';
import { createApiResponse } from '../common/utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.ProductRepo.save(createProductDto);
    return createApiResponse(201, 'Product created successfully', { product });
  }

  async findAll(query: PaginationDto) {
    const { filter, order = 'asc', page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const where = filter
      ? [{ name: Like(`%${filter}%`) }, { description: Like(`%${filter}%`) }]
      : {};

    const [products, total] = await this.ProductRepo.findAndCount({
      where,
      order: {
        name: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      },
      skip,
      take: limit,
    });

    return {
      products,
      skip,
      limit,
      total,
    };
  }

  async findOne(id: number) {
    const product = await this.ProductRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.ProductRepo.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return await this.ProductRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return await this.ProductRepo.remove(product);
  }
}
