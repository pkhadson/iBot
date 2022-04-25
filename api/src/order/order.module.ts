import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderGateway } from './order.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';

@Module({
  providers: [OrderGateway, OrderService],
  imports: [TypeOrmModule.forFeature([Order, Customer])],
})
export class OrderModule {}
