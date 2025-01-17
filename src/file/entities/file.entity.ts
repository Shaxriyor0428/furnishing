import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column({ nullable: true })
  @ApiProperty({
    description: 'The file name of the uploaded file',
    example: 'image.jpg',
  })
  filename?: string;
}
