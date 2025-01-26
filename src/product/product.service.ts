import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Like, Repository } from 'typeorm';
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
    console.log(order);
    console.log(priceOrder);

    const where = filter
      ? [{ name: Like(`%${filter}%`) }, { description: Like(`%${filter}%`) }]
      : {};

    const orderBy: FindOptionsOrder<any> = priceOrder
      ? {
          price: priceOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
          createdAt: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        }
      : {
          createdAt: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
        };
    const [products, total] = await this.ProductRepo.findAndCount({
      where,
      order: orderBy,
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

  async productWithCategoryId(category_id: number) {
    const products = await this.ProductRepo.find({
      where: { categoryId: category_id },
    });

    if (!products || products.length === 0) {
      throw new NotFoundException(
        `No products found with category ID ${category_id}`,
      );
    }

    return {
      data: products,
      statusCode: 200,
      message: 'Products retrieved successfully',
    };
  }

  async findOne(id: number) {
    const product = await this.ProductRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto, images: any[]) {
    const { tags, colors, ...rest } = updateProductDto;
    const sanitizedDto = {
      ...(tags && tags.length > 0 && { tags }),
      ...(colors && colors.length > 0 && { colors }),
      ...rest,
    };

    await this.ProductRepo.update(id, sanitizedDto);
    const product = await this.ProductRepo.findOneBy({ id });
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
      await this.ProductRepo.save(product);
    }

    return createApiResponse(200, 'Product updated successfully', {
      updatedProduct: product,
    });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    if (!product) {
      throw new BadRequestException(`Product not found with id ${id}`);
    }
    if (product.images && product.images.length > 0) {
      deleteFiles(product.images);
    }
    await this.ProductRepo.remove(product);
    return createApiResponse(200, 'Product delete successfully');
  }
}
