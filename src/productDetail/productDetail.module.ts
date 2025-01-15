import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { productDetail } from './entities/productDetail.entity';
import { ProductDetailController } from './productDetail.controller';
import { ProductDetailService } from './productDetail.service';

@Module({
  imports:[TypeOrmModule.forFeature([productDetail]), JwtModule],
  controllers: [ProductDetailController],
  providers: [ProductDetailService],
  exports:[ProductDetailService]
})
export class ProductDetailModule {}
