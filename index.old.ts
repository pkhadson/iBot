// @ts-nocheck
import Trello from "trello";
import { statusManager } from "./status";
import { create, Message, Whatsapp } from "venom-bot";
import { msg } from "./constants";
import axios, { Axios, AxiosResponse } from "axios";
import fs from "fs";
import path from "path";
import { cpf } from "cpf-cnpj-validator";
import { pathToArray } from "graphql/jsutils/Path";

const LIST_ID = "61b36677e60fb9195cbb6968";
const BOARD_ID = "61b366700ee8180feaaab1be";

const members = {
  izabella: "5f85ca4c7d31e1304ff5c420",
};

const trello = new Trello(
  "ccfca46f9d9a08350606615a717dd581",
  "ec80e84f23d47e8f9e3d97100822cc22d554774f64add614c5a00f7ef841c745"
);

const feedbackId = "120363022356250156@g.us";

console.log(path.join(__dirname, "teste"));
create({
  session: "BelaIza", //name of session
  multidevice: false, // for version not multidevice use false.(default: true)
  headless: false,
  folderNameToken: "teste",
  browserArgs: ["--user-data-dir=" + path.join(__dirname, "teste")],
  // browserSessionToken: require("./session.json"),
})
  .then((client) => {
    setInterval(
      () =>
        client
          .getSessionTokenBrowser()
          .then((a) => fs.writeFileSync("./session.json", JSON.stringify(a))),
      10000
    );
    client
      .getSessionTokenBrowser()
      .then((a) => fs.writeFileSync("./session.json", JSON.stringify(a)));
    setTimeout(() => start(client), 1000);
    // client.getChatById("553499744352@c.us").then(console.log);
    // client.getChatById("553496502558@c.us").then(console.log);
    // setTimeout(
    //   () =>
    //     client
    //       .sendButtons("553499744352@c.us", ...toButton(msg.INDICATE_QUESTION))
    //       .catch(console.log),
    //   2000
    // );
  })
  .catch(console.error);

const toButton = (getter: () => any): [string, [], string] => {
  const [title, buttons, subtitle] = getter();
  return [
    title,
    buttons.map((a: string) => ({ buttonText: { displayText: a } })) as [],
    subtitle || "Use os botões abaixo para responder",
  ];
};

const getId = (id: string) => id["_serialized" as "0"] || id;

async function start(client: Whatsapp) {
  client
    .sendContactVcard(
      "5534999744352@c.us",
      "553498870303@c.us",
      "Izabella - Limpa nome Evera"
    )
    .catch(console.error);

  return;
}
