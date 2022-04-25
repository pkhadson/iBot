import fs from "fs";
import { SimpleConsoleLogger } from "typeorm";
import Connection from "./conn";
import { Customer } from "./entities/Customer";

setTimeout(async () => {
  if (new Date().getTime() > 0) return;
  const letters = "DGRNAOPQBCMEFHIJKL".split("");

  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    console.log("l", l);
    const rows = JSON.parse(
      fs.readFileSync(
        "/Users/pkhadson/Downloads/bkp/list/" + l + ".json",
        "utf-8"
      )
    );

    const chunkSize = 200;
    for (let i3 = 0; i3 < rows.length; i3 += chunkSize) {
      const subRows = rows.slice(i3, i3 + chunkSize);

      // do whatever
      await Promise.all(
        subRows.map(async (row: any) => {
          if (
            !row.dsTelefoneCelular ||
            (await Connection.manager.count(Customer, {
              where: { cpf: row.dsCpf },
            })) > 0
          ) {
          } else {
            const dbRow = new Customer();
            dbRow.name = row.nmUsuario;
            dbRow.cpf = row.dsCpf;
            dbRow.birthDate = new Date(row.dtNascimento);
            dbRow.phone = row.dsTelefoneCelular;
            dbRow.zip_code = row.dsCep;
            dbRow.address = row.dsTipoLogradouro + " " + row.dsLogradouro;
            dbRow.address_number = row.nrImovelLograd;
            dbRow.address_district = row.dsBairro;
            dbRow.address_complement = row.dsComplLograd;
            dbRow.email = row.dsEmail;
            dbRow.city = row.dsCidade;
            dbRow.uf = row.dsUf;
            dbRow.gender = row.dsSexo;
            dbRow.rg = row.dsDocumentoIdentidade;
            await Connection.manager.save(dbRow);
          }
        })
      );
      console.log("-");
    }
  }
}, 5000);

setTimeout(async () => {
  const cpfs = (
    await Connection.manager.find(Customer, { select: ["cpf"] })
  ).map((a) => a.cpf);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVXWY".split("").reverse();

  for (let i = 0; i < letters.length; i++) {
    const l = letters[i];
    console.log("l", l);
    const rows = JSON.parse(
      fs.readFileSync(
        "/Users/pkhadson/Downloads/bkp/list/" + l + ".json",
        "utf-8"
      )
    ).filter((a: any) => a.dsTelefoneCelular);

    const chunkSize = 2000;
    for (let i3 = 0; i3 < rows.length; i3 += chunkSize) {
      const subRows = rows.slice(i3, i3 + chunkSize);

      await Connection.createQueryBuilder()
        .insert()
        .into(Customer)
        .values(
          subRows.map((row: any) => ({
            name: row.nmUsuario,
            cpf: row.dsCpf,
            birthDate: new Date(row.dtNascimento),
            phone: row.dsTelefoneCelular,
            zip_code: row.dsCep,
            address: row.dsTipoLogradouro + " " + row.dsLogradouro,
            address_number: row.nrImovelLograd,
            address_district: row.dsBairro,
            address_complement: row.dsComplLograd,
            email: row.dsEmail,
            city: row.dsCidade || "UBERLANDIA",
            uf: row.dsUf || "MG",
            gender: row.dsSexo,
            rg: row.dsDocumentoIdentidade,
          }))
        )
        .execute();
    }
    console.log("Fim");
  }
}, 1000);
