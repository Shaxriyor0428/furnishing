import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    const newCart = this.cartRepo.create(createCartDto);
    await this.cartRepo.save(newCart);
    return createApiResponse(201, 'Cart created successfully', newCart);
  }

  async findAll() {
    const carts = await this.cartRepo.find({ relations: ['cart_details'] }); // ['customer']
    return createApiResponse(
      200,
      'List of carts retrieved successfully',
      carts,
    );
  }

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Cart with id ${id} retrieved successfully`,
      cart,
    );
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const existingCart = await this.cartRepo.findOne({ where: { id } });
    if (!existingCart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    await this.cartRepo.update(id, updateCartDto);
    const updatedCart = await this.cartRepo.findOne({ where: { id } });

    return createApiResponse(200, 'Cart updated successfully', updatedCart);
  }

  async remove(id: number) {
    const cart = await this.cartRepo.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    await this.cartRepo.delete(id);
    return createApiResponse(200, `Cart with id ${id} removed successfully`);
  }
}
