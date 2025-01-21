import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginationDto } from 'src/admin/dto/pagination.dto';
import { createApiResponse } from '../common/utils';
import { Category } from '../category/entities/category.entity';
import { deleteFiles, saveFile } from '../common/helpers/saveImage';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto, images: any[]) {
    const category = await this.categoryRepo.findOneBy({
      id: createProductDto.categoryId,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const existsProduct = await this.ProductRepo.findOneBy({
      sku: createProductDto.sku,
    });
    if (existsProduct) {
      throw new BadRequestException('Product already exists');
    }

    const fileNames = await Promise.all(
      images.map((image: any) => saveFile(image)),
    );
    const product = await this.ProductRepo.save({
      ...createProductDto,
      images: fileNames,
    });

    return createApiResponse(201, 'Product created successfully', { product });
  }

  async findAll(query: PaginationDto) {
    const { filter, order = 'desc', page, limit, priceOrder } = query;
    const skip = (page - 1) * limit;

    const where = filter
      ? [{ name: Like(`%${filter}%`) }, { description: Like(`%${filter}%`) }]
      : {};

    const [products, total] = await this.ProductRepo.findAndCount({
      where,
      order: {
        createdAt: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        price: priceOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      },
      skip,
      take: limit,
    });

    return createApiResponse(200, 'Product retrieved successfully', {
      products,
      skip,
      limit,
      total,
    });
  }

  async findOne(id: number) {
    const product = await this.ProductRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, images: any[]) {
    const product = await this.ProductRepo.preload({
      id: id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    if (images && images.length > 0) {
      if (product.images && product.images.length > 0) {
        deleteFiles(product.images);
      }

      const fileNames = await Promise.all(
        images.map((image: any) => saveFile(image)),
      );
      product.images = fileNames;
    }

    await this.ProductRepo.save(product);
    return createApiResponse(200, 'Product updated successfully', { product });
  }

  async remove(id: number) {
    console.log(id);
    
    const product = await this.findOne(id);
    if (product.images && product.images.length > 0) {
      deleteFiles(product.images);
    }
    await this.ProductRepo.remove(product);
    return createApiResponse(200, 'Product delete successfully');
  }
}
