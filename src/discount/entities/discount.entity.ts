import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dicount')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  percent: number;

  @Column({ type: 'int' })
  product_id: number;

  @Column({ type: 'boolean', default: false })
  is_active: boolean;
}
