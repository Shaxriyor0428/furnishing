import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDetailDto } from './dto/create-productDetail.dto';
import { UpdateProductDetailDto } from './dto/update-productDetail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { productDetail } from './entities/productDetail.entity';
import { PaginationDto } from 'src/admin/dto/pagination.dto';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(productDetail) private productDetailRepo: Repository<productDetail>
  ) {}

  async create(createProductDetailDto: CreateProductDetailDto) {
    const newProductDetail = this.productDetailRepo.create(createProductDetailDto);
    return await this.productDetailRepo.save(newProductDetail);
  }

    async findAll(query: PaginationDto) {
      const { filter, order = 'asc', page = 1, limit = 10 } = query;
    
      const skip = (page - 1) * limit;
    
      const where = filter
        ? [
            { name: Like(`%${filter}%`) }, 
            { description: Like(`%${filter}%`) }, 
          ]
        : {};
    
      const [products, total] = await this.productDetailRepo.findAndCount({
        where,
        order: {
          productId: order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC', 
        },
        skip,
        take: limit,
      });
    
      return {
        products,
        skip,
        limit,
        total
      };
    }
  async findOne(id: number) {
    const productDetail = await this.productDetailRepo.findOneBy({ id });
    if (!productDetail) {
      throw new NotFoundException(`ProductDetail with ID ${id} not found.`);
    }
    return productDetail;
  }

  async update(id: number, updateProductDetailDto: UpdateProductDetailDto) {
    const productDetail = await this.productDetailRepo.preload({
      id: id,
      ...updateProductDetailDto,
    });

    if (!productDetail) {
      throw new NotFoundException(`ProductDetail with ID ${id} not found.`);
    }

    return await this.productDetailRepo.save(productDetail);
  }

  async remove(id: number) {
    const productDetail = await this.findOne(id);  
    return await this.productDetailRepo.remove(productDetail);
  }
}
