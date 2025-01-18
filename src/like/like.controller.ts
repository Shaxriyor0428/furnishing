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
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../admin/dto/pagination.dto';

@ApiTags('Like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiOperation({ summary: 'Toggle like for a product' })
  @ApiResponse({
    status: 201,
    description: 'Like toggled successfully.',
    type: CreateLikeDto,
  })
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.toggleLike(createLikeDto);
  }

  @ApiOperation({ summary: 'Get likes for a specific product' })
  @ApiResponse({
    status: 200,
    description: 'List of likes for the product.',
  })
  @ApiParam({
    name: 'product_id',
    description: 'ID of the product',
    example: 42,
  })
  @Get('/product/:product_id')
  findProductLike(@Param('product_id') product_id: string) {
    return this.likeService.getProductLikes(+product_id);
  }

  @ApiOperation({ summary: 'Get all likes with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of likes.',
    type: [CreateLikeDto],
  })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.likeService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Get a like by ID' })
  @ApiResponse({ status: 200, description: 'Like found.', type: CreateLikeDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a like by ID' })
  @ApiResponse({
    status: 200,
    description: 'Like updated successfully.',
    type: CreateLikeDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(+id, updateLikeDto);
  }

  @ApiOperation({ summary: 'Delete a like by ID' })
  @ApiResponse({ status: 200, description: 'Like deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
