import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  productId: number;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @OneToOne(() => Product, (product) => product.image)
  product: Product;
}
