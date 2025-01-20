import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from '../../common/types/payment_method';

export class CreatePaymentDto {
  @IsInt()
  orderId: number;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @IsInt()
  amount: number;

  @IsString()
  @IsOptional()
  paymeTransactionId?: string; // Payme tranzaksiya ID
}
