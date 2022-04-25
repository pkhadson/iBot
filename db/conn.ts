import { DataSource } from "typeorm";
import path from "path";
import { Customer } from "./entities/Customer";

console.log(path.join(__dirname, "./entities/Customer{.js,.ts}"));

const Connection = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "db/data.sqlite"),
  logging: false,
  entities: [path.join(__dirname, "./entities/Customer{.js,.ts}")],
  synchronize: true,
});

Connection.initialize()
  .then(() => console.log("DB | CONEXÃO OK"))
  .catch((e) => {
    console.log("DB | CONEXÃO FALHOU");
    console.error(e);
  });

// setTimeout(() => {
//   const a = new Customer();
//   a.name = "Patrick";
//   a.cpf = "string";
//   a.birthDate = new Date();
//   a.phone = "string";
//   a.zip_code = "string";
//   a.address = "string";
//   a.address_district = "string";
//   a.address_number = "string";
//   a.address_complement = "string";
//   a.email = "string";
//   a.city = "string";
//   a.uf = "string";
//   a.gender = "string";
//   a.rg = "string";

// Connection.manager.save(a);
// }, 2000);

export default Connection;
