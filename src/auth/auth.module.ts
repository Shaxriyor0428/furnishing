import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AdminAuthController } from './admin-auth/admin.auth.controller';
import { CustomerAuthController } from './customer-auth/customer.auth.controller';
import { AdminAuthService } from './admin-auth/admin.auth.service';
import { CustomerAuthService } from './customer-auth/customer.auth.service';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([Admin]),
    // MailModule
  ],
  controllers: [AdminAuthController, CustomerAuthController],
  providers: [AdminAuthService, CustomerAuthService],
  exports: [AdminAuthService, CustomerAuthService, JwtModule],
})
export class AuthModule {}
