import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  reting: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'int' })
  customer_id: number;

  @ManyToOne(() => Product, (product) => product.ratings, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Customer, (customer) => customer.ratings, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
