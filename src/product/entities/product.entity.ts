import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetail } from '../../order_detail/entities/order_detail.entity';
import { Likes } from '../../like/entities/like.entity';
import { Review } from '../../review/entities/review.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ name: 'average_rating', type: 'int' })
  averageRating: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'simple-array', nullable: true })
  colors: string[];

  @Column({ type: 'varchar', nullable:true})
  sku: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => Likes, (like) => like.product)
  likes: Likes[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
