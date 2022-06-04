import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Order2' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  botIndentify: string;

  @Column({ nullable: true })
  debitAmount: number;

  @Column({ nullable: true }) amountPay: number;

  @Column({ default: 'PENDING' }) status:
    | 'PENDING'
    | 'PAID'
    | 'CANCELED'
    | 'SENDED';

  @Column({
    default: false,
  })
  feedback: boolean;

  @Column({ nullable: true })
  client_name: string;

  @Column({ nullable: true })
  client_number: string;

  @Column({ nullable: true })
  client_picture: string;

  @Column()
  document_number: string;

  @Column({ nullable: true })
  url: string;

  @Column({ default: false, nullable: false })
  proposal_send: boolean;

  @CreateDateColumn({ type: 'datetime' })
  // @Column({ default: () => new Date().toISOString() })
  createdAt: Date;
}
