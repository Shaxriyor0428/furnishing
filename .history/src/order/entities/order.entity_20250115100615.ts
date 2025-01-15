import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/types/order_status';
import { OrderDetail } from '../../order_detail/entities/order_detail.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { OrderAddress } from '../../order_addresses/entities/order_address.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  customerId: number;

  @Column({ type: 'int' })
  orderAddressId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @Column({ type: 'int' })
  total_amount: number;

  @Column({ type: 'timestamp' })
  order_date: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  // @ManyToOne(() => Customer, (customer) => customer.Order)
  // @JoinColumn({ name: 'customerId' })
  // customer: Customer; ///CUSTOMERga bog'lanish joyi

  @ManyToOne(() => OrderAddress, (orderAddress) => orderAddress.Order)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
