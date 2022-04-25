import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as moment from 'moment';

const client = Axios.create({
  baseURL: 'https://api.pagar.me/core/v5/',
  auth: {
    username: [
      'sk_4nkMLz5UQXF41r1b',
      'sk_xQOPlYdu',
      '',
      'asdliouhopiuhopioinpoinpoinpoin',
    ][0],
    password: '',
  },
});

interface CreateOrder {
  debit_amount: number; //cents
  client_name: number;
}

export class OrderP {
  public amount_pay: number;
  constructor(public debit_amount: number, private client_name: string) {
    const rule = [
      [2000, 1600],
      [4000, 1800],
      [7000, 2500],
      [10000, 3500],
      [20000, 4500],
      [30000, 7000],
      [40000, 8000],
      [50000, 10000],
      [70000, 12000],
      [100000, 15000],
      [200000, 20000],
      [300000, 25000],
      [400000, 30000],
      [500000, 40000],
    ]
      //   .reverse()
      .find((a) => a[0] >= this.debit_amount);

    this.amount_pay = rule ? rule[1] : (this.debit_amount / 100) * 8;
    this.amount_pay = (this.amount_pay / 100) * 106 + 22;

    this.debit_amount;
  }

  async getInvoice(): Promise<string> {
    const payload = {
      items: [
        {
          amount: this.amount_pay * 100,
          description: 'Limpeza de divida',
          quantity: 1,
        },
      ],
      customer: {
        name: this.client_name,
      },
      payments: [
        {
          amount: this.amount_pay * 100,
          payment_method: 'checkout',
          checkout: {
            expires_in: 120,
            billing_address_editable: false,
            customer_editable: true,
            accepted_payment_methods: ['credit_card', 'boleto', 'pix'],
            success_url: 'https://www.pagar.me',
            boleto: {
              bank: '033',
              instructions: 'Pagar até o vencimento',
              due_at:
                moment().add(10, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
            },
            credit_card: {
              installments: [1, 2, 3, 4].map((number) => ({
                number,
                total: this.calculateInstallments(number).amount * 100,
              })),
            },
          },
        },
      ],
    };

    const { data } = await client.post('orders', payload);

    return data.checkouts[0].payment_url;
  }

  calculateInstallments(qtd: number) {
    return {
      quantity: qtd,
      amount: Math.round((this.amount_pay / 100) * (100 + (qtd - 1) * 3.5)),
    };
  }
}
