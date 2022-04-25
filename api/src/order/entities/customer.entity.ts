import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'Customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  phone: string;

  @Column()
  zip_code: string;

  @Column()
  address: string;

  @Column()
  address_district: string;

  @Column({ nullable: true })
  address_number: string;

  @Column({ nullable: true })
  address_complement: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  rg: string;

  @Column({ default: false })
  sended: boolean;
}
