import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from '../../order_detail/entities/order_detail.entity';
import { Likes } from '../../like/entities/like.entity';
import { Review } from '../../review/entities/review.entity';
import { productDetail } from '../../productDetail/entities/productDetail.entity';
import { Rating } from '../../rating/entities/rating.entity';
import { Category } from '../../category/entities/category.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { CartDetail } from '../../cart_detail/entities/cart_detail.entity';
import { Image } from '../../images/entities/image.entity';

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

  @Column({ type: 'varchar', nullable: true })
  sku: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Likes, (like) => like.product)
  likes: Likes[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @OneToMany(() => CartDetail, (cartDetail) => cartDetail.product)
  cart_details: CartDetail[];

  @OneToMany(() => Rating, (rating) => rating.product)
  ratings: Rating[];

  @OneToOne(() => productDetail, (productDetail) => productDetail.product)
  productDetail: productDetail;

  @OneToOne(() => Image, (image) => image.product)
  image: Image;

  @OneToOne(() => Discount, (discount) => discount.product)
  discount: Discount;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
