import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepo: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.ProductRepo.create(createProductDto);
    return await this.ProductRepo.save(newProduct);
  }

  async findAll() {
    return await this.ProductRepo.find();
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
