import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { OrderAddress } from '../../order_addresses/entities/order_address.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  is_active: boolean;

  @Column({ type: 'varchar' })
  phone_number: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  hashed_password: string;

  @Column({ type: 'varchar', nullable: true })
  hashed_refresh_token: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => OrderAddress, (orderAddress) => orderAddress.customer_id)
  order_addresses: OrderAddress[];
}
