import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Order' })
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  botIndentify: string;

  @Field(() => String)
  @Column()
  debitAmount: number;

  @Column() amountPay: number;

  @Column() status: 'PENDING' | 'PAID' | 'CANCELED';

  @Column() feedback: number;

  @CreateDateColumn({ type: 'datetime' })
  @Column()
  createdAt: Date;
}
