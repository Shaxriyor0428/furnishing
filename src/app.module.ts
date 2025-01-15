import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
<<<<<<< HEAD
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { PaymentModule } from './payment/payment.module';
=======
=======
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { PaymentModule } from './payment/payment.module';
>>>>>>> d9aadaf6fc8119cc40bfc17876f6d9d483cb9aff
import { CartModule } from './cart/cart.module';
import { CartDetailModule } from './cart_detail/cart_detail.module';
import { OrderAddressesModule } from './order_addresses/order_addresses.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';
import { CustomerModule } from './customer/customer.module';
import { ProductDetailModule } from './productDetail/productDetail.module';
<<<<<<< HEAD
>>>>>>> 6a43679130f454d72273f2c3dc4ea29858b1a88b
=======
>>>>>>> d9aadaf6fc8119cc40bfc17876f6d9d483cb9aff

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
<<<<<<< HEAD
<<<<<<< HEAD
    OrderModule,
    OrderDetailModule,
    PaymentModule,
=======
=======
    OrderModule,
    OrderDetailModule,
    PaymentModule,
>>>>>>> d9aadaf6fc8119cc40bfc17876f6d9d483cb9aff
    CartModule,
    CartDetailModule,
    OrderAddressesModule,
    ProductModule,
    FileModule,
    CustomerModule,
    ProductDetailModule
<<<<<<< HEAD
>>>>>>> 6a43679130f454d72273f2c3dc4ea29858b1a88b
=======
>>>>>>> d9aadaf6fc8119cc40bfc17876f6d9d483cb9aff
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
