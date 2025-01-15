import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @Column()
  @IsString()
  @ApiProperty()
  filename: string;

  @Column()
  @IsString()
  @ApiProperty()
  originalname: string;

  @Column()
  @IsString()
  @ApiProperty()
  path: string;

  @Column()
  @IsString()
  @ApiProperty()
  mimetype: string;
}
