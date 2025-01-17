import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('productDetail')
export class productDetail {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'integer', nullable: false })
  productId: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  withCm: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  heghtCm: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  depthCm: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  weightKg: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  seatHeightCm: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  legHeightCm: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  countryOrigin: string;

  @Column('bigint', { array: true, nullable: false })
  tags: number[];

  @Column({ type: 'integer', nullable: false })
  capacity: number;

  @Column({ type: 'integer', nullable: false })
  warranty: number;

  @Column({ type: 'integer', nullable: false })
  maxLoadCapacity: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  material: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  fillingMaterial: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  upholsteryMaterial: string;

  @OneToOne(() => Product, (product) => product.productDetail)
  product: Product;

  
}
