import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CartDetail } from '../../cart_detail/entities/cart_detail.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  customer_id: number;

  @Column({ type: 'int' })
  total_price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'date' })
  time: Date;

  @OneToMany(() => CartDetail, (cart_detail) => cart_detail.cart)
  cart_details: CartDetail[];

  // @OneToOne(() => Customer, (customer) => customer.cart)
  // customer: Customer;
}
