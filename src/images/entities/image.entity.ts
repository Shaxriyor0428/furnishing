import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  productId: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];
}
