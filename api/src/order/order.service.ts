import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, MoreThan, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    public orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    public customerRepository: Repository<Customer>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.save(createOrderDto);
  }

  findAll() {
    return this.orderRepository.find({
      where: { status: 'PENDING', debitAmount: IsNull() },
      order: {
        phone: 'ASC',
      },
    });
  }

  getProposals() {
    return this.orderRepository.find({
      where: {
        status: 'PENDING',
        debitAmount: MoreThan(0),
        proposal_send: false,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  update(id: number, data) {
    return this.orderRepository.save({ ...data, id });
  }
}
