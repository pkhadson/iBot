import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    public customerRepository: Repository<Customer>
  ) {}

  async getLead() {
    const row = await this.customerRepository.findOne({
      select: ["id", "cpf", "phone"],
      where: [
        {
          sended: false,
          birthDate: Between("01-01-1961 00:00:00", "31-12-1997 00:00:00"),
        },
      ],
      order: {
        order: "DESC",
      },
    });

    row.sended = true;
    await this.customerRepository.save(row);

    if (!row.phone) throw new NotFoundException();

    return { phone: row.phone };
  }
}
