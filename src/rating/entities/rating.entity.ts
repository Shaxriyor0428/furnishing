import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
