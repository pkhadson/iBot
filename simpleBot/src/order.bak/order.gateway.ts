import { InjectRepository } from '@nestjs/typeorm';
import {
  WebSocketGateway,
  SubscribeMessage,
  WsResponse,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

@WebSocketGateway(3001, {
  cors: true,
  allowEIO3: true,
  //   transports: ['websocket'],
  //   namespace: 'order',
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  _admins: Socket[];

  constructor(private orderRepository: OrderService) {
    console.log('oi');
  }

  @SubscribeMessage('g  et')
  aa() {
    console.log('oi');
  }

  findAll() {}

  get admins(): Socket[] {
    return this._admins.filter((a) => a.connected);
  }
}
