// import { readFileSync, existsSync, writeFileSync } from "fs";
import express, { Express } from "express";
import cors from "cors";
import Conn from "./conn";
import { Customer } from "./entities/Customer";
import { Between, Not } from "typeorm";

const app: Express = express();

const port = 6767;

app.use("/wpp.js", express.static("./wpp.js"));
app.use("/cartao.pdf", express.static("./cartao.pdf"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(cors({ origin: "https://web.whatsapp.com" }));

app.get("/belaiza", async (_req: Request, res: any) => {
  const row = await Conn.manager.findOne(Customer, {
    select: ["cpf", "phone"],
    where: [
      {
        sended: false,
        // @ts-ignore
        birthDate: Between("01-01-1961 00:00:00", "31-12-1997 00:00:00"),
      },
    ],
    order: {
      order: "DESC",
    },
  });
  if (!row) return res.e();

  await Conn.manager.update(
    Customer,
    {
      phone: row.phone,
    },
    { sended: true }
  );

  res.send("window.send('" + row.phone + "')");
});
