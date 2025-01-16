import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty({
    description: 'Customer last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({
    description: 'Customer phone number',
    example: '+998931631621',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty({
    description: 'Customer email',
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

 
  @ApiProperty({
    description: 'Password for customer account',
    example: 'Strong12',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  readonly password: string;

  @ApiProperty({
    description: 'Password for customer account',
    example: 'Strong12',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 4,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  readonly confirm_password: string;
}
