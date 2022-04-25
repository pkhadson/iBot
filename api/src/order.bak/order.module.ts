import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { OrderGateway } from './order.gateway';

@Module({
  providers: [OrderResolver, OrderService, OrderGateway],
  imports: [TypeOrmModule.forFeature([Customer])],
  exports: [OrderGateway],
})
export class OrderModule {}
