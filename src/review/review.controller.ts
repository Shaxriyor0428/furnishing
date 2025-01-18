import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '../admin/dto/pagination.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a new review' })
  @ApiBody({ type: CreateReviewDto, description: 'Review details' })
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Get all reviews with pagination' })
  @ApiQuery({ type: PaginationDto, description: 'Pagination options' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.reviewService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get a single review by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  @ApiBody({ type: UpdateReviewDto, description: 'Updated review details' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Review ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
