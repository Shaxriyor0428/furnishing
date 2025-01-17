import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { createApiResponse } from '../common/utils';
import { PaginationDto } from '../admin/dto/pagination.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly ratingRepo: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto) {
    const newRating = this.ratingRepo.create(createRatingDto);
    await this.ratingRepo.save(newRating);
    return createApiResponse(201, 'Rating created successfully', { newRating });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const total = await this.ratingRepo.count();
    const calculatedSkip = (page - 1) * limit;
    const ratings = await this.ratingRepo.find({
      relations: ['rating_details'],
      skip: calculatedSkip,
      take: limit,
    });
    return createApiResponse(200, 'List of ratings retrieved successfully', {
      ratings,
      total,
      limit,
      page,
    });
  }

  async findOne(id: number) {
    const rating = await this.ratingRepo.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with id ${id} not found`);
    }
    return createApiResponse(
      200,
      `Rating with id ${id} retrieved successfully`,
      { rating },
    );
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    const existingRating = await this.ratingRepo.findOne({ where: { id } });
    if (!existingRating) {
      throw new NotFoundException(`Rating with id ${id} not found`);
    }

    await this.ratingRepo.update(id, updateRatingDto);
    const updatedRating = await this.ratingRepo.findOne({ where: { id } });

    return createApiResponse(200, 'Rating updated successfully', {
      updatedRating,
    });
  }

  async remove(id: number) {
    const rating = await this.ratingRepo.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException(`Rating with id ${id} not found`);
    }

    await this.ratingRepo.delete(id);
    return createApiResponse(200, `Rating with id ${id} removed successfully`);
  }
}
