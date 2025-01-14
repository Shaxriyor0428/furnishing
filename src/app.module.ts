import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CartDetailModule } from './cart_detail/cart_detail.module';
import { OrderAddressesModule } from './order_addresses/order_addresses.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import { CustomerModule } from './customer/customer.module';
import { ProductDetailModule } from './productDetail/productDetail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      synchronize: true,
      entities: [join(__dirname, '**/*.entity.{ts,js}')],
      logging: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    AuthModule,
    CartModule,
    CartDetailModule,
    OrderAddressesModule,
    ProductModule,
    FileModule,
    CustomerModule,
    ProductDetailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
