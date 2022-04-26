import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Server, Socket } from 'socket.io';
import { OrderP } from 'src/payment/gateways/pagarme.gateway';
import { Between } from 'typeorm';
import { readFileSync } from 'fs';
import path from 'path';

@WebSocketGateway({
  cors: true,
  allowEIO3: true,
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  _admins: Socket[] = [];
  _bots: [String, Socket][] = [];

  constructor(private readonly orderService: OrderService) {
    this.sendNumber();
  }

  sendNumber() {
    const intervals = [15000, 20000];

    setTimeout(
      () => this.sendNumber(),
      intervals[0] + Math.random() * intervals[1],
    );

    try {
      if (
        readFileSync(path.join(__dirname, '../../run'), 'utf-8').trim() !== 'S'
      )
        return;
    } catch (err) {
      return console.error(err);
    }
    this.bots.forEach(async ([id, socket]: [string, Socket]) => {
      const number = await this.orderService.customerRepository.findOne({
        where: {
          sended: false,
          birthDate: Between('01-01-1961 00:00:00', '31-12-1997 00:00:00'),
        },
        order: {
          cpf: 'DESC',
        },
      });

      number.sended = true;

      await this.orderService.customerRepository.update(
        { phone: number.phone },
        { sended: true },
      );
      await this.orderService.customerRepository.save(number);

      if (number && number.phone) {
        const a = number.phone;
        console.log('ENVIA', a);
        socket.emit('sendMessage', {
          id: '55' + a.substring(0, 2) + a.substring(a.length - 8) + '@c.us',
        });
      }
    });
  }

  @SubscribeMessage('createOrder')
  async create(@MessageBody() createOrderDto: CreateOrderDto) {
    await this.orderService.create(createOrderDto);
    this.broadcastList();
  }

  @SubscribeMessage('findAllOrder')
  findAll() {
    return this.orderService.findAll();
  }

  async broadcastList(socket?: Socket[]) {
    const rows = await this.orderService.findAll();

    (socket || this.admins).forEach((c) => c.emit('refreshList', rows));
  }

  get admins(): Socket[] {
    this._admins = this._admins.filter((a) => a.connected);
    return this._admins;
  }

  get bots(): [String, Socket][] {
    this._bots = this._bots.filter((a) => a[1].connected);
    return this._bots;
  }

  @SubscribeMessage('iamAdmin')
  iamAdmin(@ConnectedSocket() socket: Socket) {
    this._admins.push(socket);
    this.broadcastList([socket]);
    console.log('ADMIN CONECTADO', this._admins.length, this.admins.length);
  }

  @SubscribeMessage('iamBot')
  iamBot(@MessageBody() id: string, @ConnectedSocket() socket: Socket) {
    this._bots.push([id, socket]);

    this.sendProposal();

    console.log('BOT CONECTADO', this._bots.length, this.bots.length);
  }

  async sendProposal() {
    const proposals = await this.orderService.getProposals();

    console.log('Proposals::', proposals);

    const bots: Record<string, Socket> = Object.fromEntries(this.bots);

    for (let i = 0; i < proposals.length; i++) {
      const item = proposals[i];
      if (!bots[item.botIndentify]) continue;

      try {
        const orderp = new OrderP(item.debitAmount / 100, item.client_name);

        const url = await orderp.getInvoice();

        item.url = url;
        item.status = 'SENDED';
        item.amountPay = orderp.amount_pay;

        const payload = { ...item, url };

        await this.orderService.orderRepository.save(item);

        console.log(
          `ENVIAR PROPOSTA ${item.botIndentify} - ${JSON.stringify(
            item,
            null,
            2,
          )}`,
        );

        bots[item.botIndentify].emit('proposal', payload);
      } catch (err) {
        console.error(err);
      }
    }
  }

  @SubscribeMessage('debitAmount')
  async debitAmount(
    @MessageBody()
    payload: {
      id: number;
      debit_amount: number;
    },
  ) {
    await this.orderService.update(payload.id, {
      debitAmount: payload.debit_amount,
    });

    this.sendProposal();
    this.broadcastList();
  }

  @SubscribeMessage('getLink')
  async getLink(@MessageBody() id: string, @ConnectedSocket() socket: Socket) {
    const row = await this.orderService.orderRepository.findOne({
      where: { client_number: id },
      order: { createdAt: 'DESC' },
    });
    if (row && row.url) {
      this.server.emit('sendLink', row);
    }
  }
}
