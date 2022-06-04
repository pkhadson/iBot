"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var path_1 = __importDefault(require("path"));
console.log(path_1.default.join(__dirname, "../data.sqlite"));
var Connection = new typeorm_1.DataSource({
    type: "sqlite",
    database: path_1.default.join(__dirname, "/data.sqlite"),
    logging: false,
    entities: [path_1.default.join(__dirname, "./entities/Customer{.js,.ts}")],
    synchronize: true,
});
Connection.initialize()
    .then(function () { return console.log("DB | CONEXÃO OK"); })
    .catch(function (e) {
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
exports.default = Connection;
