import { Injectable } from '@nestjs/common';
import { Customer } from '../../customer/entities/customer.entity';

@Injectable()
export class CustomerAuthService {
  
    async customerGenerateTokens(customer:Customer){
        const payload = {
            id:customer.id,
            email:customer.email,
            is_active:customer.is_active
        }
    }
}
