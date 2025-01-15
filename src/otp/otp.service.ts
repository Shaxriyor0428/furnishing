import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import * as NodeCache from 'node-cache';
import { generate } from 'otp-generator';
import { AddMinutesToDate } from '../common/helpers/add-minute';
import * as uuid from 'uuid';
import { decode, encode } from '../common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { MailService } from '../mail/mail.service';

const my_cache = new NodeCache();

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private otpRepo: Repository<Otp>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private mailService: MailService,
  ) {}

  async create(createOtpDto: CreateOtpDto) {
    const { email } = createOtpDto;
    const customer = await this.customerRepo.findOneBy({ email });

    if (!customer) {
      throw new UnauthorizedException('User not found');
    }

    const otp = generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.delete({ email: customer.email });

    const newOtp = await this.otpRepo.save({
      id: uuid.v4(),
      otp,
      expiration_time,
      email: customer.email,
    });

    const details = {
      time: now,
      email: customer.email,
      otp_id: newOtp.id,
    };
    const encodedData = await encode(JSON.stringify(details));

    try {
      await this.mailService.sendMail(customer, otp);
    } catch (error) {
      console.log('ERROR ON OTP CREATE, ', error);
      throw new InternalServerErrorException(
        'Error sending activation otp code',
      );
    }

    my_cache.set(otp, encodedData, 300);
    return {
      id: customer.id,
      SMS: 'Otp code sent to your email',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { otp, email } = verifyOtpDto;

    const currentTime = new Date();

    const data: any = my_cache.get(otp);
    if (!data) {
      throw new BadRequestException('Code incorrect or time expired');
    }

    const decodedData = await decode(data);
    const details = JSON.parse(decodedData);

    if (details.email !== email) {
      throw new BadRequestException('Otp has not been sent to this email');
    }

    const resultOtp = await this.otpRepo.findOne({
      where: { id: details.otp_id },
    });
    if (!resultOtp) {
      throw new BadRequestException('This otp not found');
    }

    if (resultOtp.verified) {
      throw new BadRequestException('This client is already activated');
    }

    if (resultOtp.expiration_time < currentTime) {
      throw new BadRequestException('This otp has expired');
    }

    if (resultOtp.otp !== otp) {
      throw new BadRequestException('Otp does not match');
    }

    await this.customerRepo.update({ email }, { is_active: true });

    const newClient = await this.customerRepo.findOne({ where: { email } });

    if (!newClient) {
      throw new BadRequestException('Client not found');
    }

    await this.otpRepo.update({ id: details.otp_id }, { verified: true });
    my_cache.del(otp);
    return {
      message: 'You have been activated',
      id: newClient.id,
    };
  }
}
