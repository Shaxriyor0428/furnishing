import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail]), JwtModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [Payment]
})
export class PaymentModule {}
