import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Discount } from './entities/discount.entity';
import { PaginationDto } from '../admin/dto/pagination.dto';

@ApiTags('Discount')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  @ApiOperation({ summary: 'Create discount' })
  @ApiResponse({
    status: 201,
    description: 'Description hab been created successfully',
    type: [Discount],
  })
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(createDiscountDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discount' })
  @ApiResponse({
    status: 200,
    description: 'You can get all discount',
    type: [Discount],
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.discountService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get discount by id' })
  @ApiResponse({
    status: 200,
    description: 'You can get discount by id',
    type: [Discount],
  })
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update discount by ID' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Discount has been updated successfully',
    type: Discount,
  })
  update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.update(+id, updateDiscountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete discount by ID' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'Discount has been deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.discountService.remove(+id);
  }
}
