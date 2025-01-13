import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  hashed_password: string;

  @Column({ type: 'varchar' })
  hashed_refresh_token: string;
}
