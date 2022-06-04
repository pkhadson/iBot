import { Controller, Get } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get("new")
  getLead() {
    return this.customerService.getLead();
  }

  @Get("new_script")
  async getScriptLead() {
    // const { phone } = await this.customerService.getLead();
    const phone = "553499744352";
    return `window.send('${phone}')`;
  }
}
