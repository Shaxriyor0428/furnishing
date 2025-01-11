import { Controller } from '@nestjs/common';
import { CustomerAuthService } from './customer.auth.service';

@Controller('customer/auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}
}
