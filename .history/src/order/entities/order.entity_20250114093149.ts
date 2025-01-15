import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../../common/types/order_status';
import { OrderDetail } from '../../order_detail/entities/order_detail.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  customerId: number;

  @Column({ type: 'int' })
  orderAdressId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @Column({ type: 'int' })
  total_amount: number;

  @Column({ type: 'timestamp' })
  order_date: Date;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.orderId)
  orderDetail: OrderDetail[];
}
