// import Trello from "trello";
import { statusManager } from "./status";
import { create, Message, Whatsapp, WhatsappProfile } from "venom-bot";
import { msg } from "./constants";
import axios, { Axios, AxiosResponse } from "axios";
import fs from "fs";
import path from "path";
import { cpf } from "cpf-cnpj-validator";
import SocketIO from "socket.io-client";
import { Order } from "./api/dist/order/entities/order.entity";

const socket = SocketIO(
  "https://casauberlandia.com.br:6702" || "http://127.0.0.1:3000",
  {
    withCredentials: false,
    reconnection: true,
  }
);

const BOT_ID = "BOT1";

let mainClient: Whatsapp;

socket.on("connect", () => {
  if (mainClient) socket.emit("iamBot", BOT_ID);
});

create({
  session: "aBelaIza", //name of session
  multidevice: false, // for version not multidevice use false.(default: true)
  headless: true,

  puppeteerOptions: {},
  useChrome: true,
  // useChrome: true,
  browserArgs: [
    // "--unhandled-rejections=strict",
    "--user-data-dir=" + path.join(__dirname, "_IGNORE_teste"),
    "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 OPR/85.0.4341.75",
  ],
})
  .then((client) => {
    // client.getChatById("553499744352@c.us").then(console.log);
    // client.getChatById("553499744353@c.us").then(console.log);

    // if (new Date().getTime() > 0) return;
    mainClient = client;
    socket.emit("iamBot", BOT_ID);
    // client
    //   .getSessionTokenBrowser()
    //   .then((a) => fs.writeFileSync("./session.json", JSON.stringify(a)));
    setTimeout(() => start(client), 1000);
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

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    n
  );

const getId = (id: any) =>
  id["_serialized" as "0"] || (id.user ? id.user + "@" + id.server : id) || id;

socket.on("proposal", async (proposal: Order) => {
  const id = proposal.client_number;
  await mainClient.sendText(
    id,
    `Boas noticias!!\n\nPesquisei o seu CPF e o valor da sua divida, sem somar com juros é de ${brl(
      proposal.debitAmount / 100
    )}. Liberamos um desconto pra você, e fechando até amanhã ás 17h, você paga apenas ${brl(
      proposal.amountPay
    )}`
  );
  statusManager.setStatus(id, "WAITING_PAYMENT_TYPE");
  await mainClient.sendButtons(id, ...toButton(msg.QUESTION_PAYMENT));
});

socket.on("sendLink", (row: Order) => {
  mainClient.sendText(
    row.client_number,
    "Ok! Esse é o link para você fazer o pagamento e assinar o contrato.\n\n" +
      row.url
  );
});

const messagesTime = {
  dia: [
    "Olá! Bom dia!",
    "Bom dia, tudo bem?",
    "Olá! Como vai?",
    "Tudo bem?",
    "Bom dia!",
    "Olá!",
    "Oi!",
  ],
  tarde: [
    "Olá! Boa tarde!",
    "Boa tarde, tudo bem?",
    "Olá! Como vai?",
    "Tudo bem?",
    "Boa tarde!",
    "Olá!",
    "Oi!",
  ],
};

socket.on("sendMessage", async ({ id }) => {
  console.log("Chegou", id);
  if (await mainClient.getChatById(id)) return console.log("retorna");

  const messages = messagesTime[new Date().getHours() < 12 ? "dia" : "tarde"];
  mainClient
    .sendText(
      id,
      messages[Math.floor(Math.random() * (messages.length - 1))] +
        " Você pode falar agora?"
    )
    .catch(() => {});
});

async function start(client: Whatsapp) {
  await client.page.evaluate(
    "window.WAPI.getAllUnreadMessages = async function () {return Store.Chat.models.filter(chat=>chat.unreadCount&&chat.unreadCount>0).map(unreadChat=>unreadChat.msgs.models.slice(-1*unreadChat.unreadCount)).flat().map(WAPI._serializeMessageObj)}"
  );

  const message = async (message: Message) => {
    const id = getId(message.sender.id);

    console.log(message, id);

    if (message.fromMe || !id.endsWith("c.us")) return;

    if (message.type != "chat" && message.type != "buttons_response")
      // return client
      //   .sendButtons(id, ...toButton(msg.UNDESTEND))
      //   .catch(console.error);
      return client.sendText(
        id,
        "Ainda não consigo receber imagens, vídeos ou audios. Peço que envie apenas mensagens de texto"
      );

    console.log(message);

    const status = statusManager.getStatus(id);
    const { body } = message;

    if (!status || body === "Começar novamente") {
      statusManager.setStatus(id, "INIT");
      try {
        await client.sendText(id, msg.PRESENTATION());
      } catch (err) {
        console.error(err);
      }
      statusManager.setStatus(id, "WAITING_START_QUESTION");
      return client
        .sendButtons(id, ...toButton(msg.START_QUESTION))
        .catch(console.error);
    }

    if (status == "WAITING_START_QUESTION" && body === "Não") {
      statusManager.setStatus(id, "INIT");
      return client.sendText(id, msg.TKS());
    }

    if (body === "Sim, pode perguntar") {
      statusManager.setStatus(id, "WAITING_MAIN_QUESTION");
      return client.sendButtons(id, ...toButton(msg.MAIN_QUESTION));
    }

    if (status === "WAITING_MAIN_QUESTION") {
      if (body.startsWith("Não")) {
        statusManager.setStatus(id, "INIT");
        return client.sendText(id, msg.TKS());
      } else if (body.startsWith("Sim")) {
        await client.sendText(id, msg.HAS());
        statusManager.setStatus(id, "WAITING_TYPE_QUESTION");
        return client.sendButtons(id, ...toButton(msg.QUESTON_TYPE));
      }
    }

    if (body.toLowerCase().indexOf("atendente") >= 0) {
      await client.sendText(
        id,
        "Certo! Vou te passar o contato de nossa *gerente comercial*. Ela vai continuar o seu atendimento. Obrigado"
      );
      statusManager.setStatus(id, "INIT");
      return client.sendContactVcard(
        id,
        "553497970148@c.us",
        "Izabella - Gerente comercial"
      );
    }

    if (status === "WAITING_TYPE_QUESTION") {
      if (body.toLowerCase().indexOf("rob") >= 0) {
        statusManager.setStatus(id, "WAITING_DOCUMENT_NUMBER");
        return client.sendText(id, msg.QUESTION_DOCUMENT_NUMBER());
      }
    }

    if (status === "WAITING_DOCUMENT_NUMBER") {
      const cpfNumber = body.replace(/[^0-9]/g, "");
      if (cpf.isValid(cpfNumber)) {
        statusManager.setStatus(id, "INIT");
        socket.emit("createOrder", {
          botIndentify: BOT_ID,
          client_name:
            message.sender["displayName" as "type"] ||
            message.sender["mentionName" as "type"] ||
            message.sender.formattedName ||
            id,
          client_number: id,
          client_picture: message.sender.profilePicThumbObj?.img,
          document_number: cpfNumber,
        });
        return client.sendText(id, msg.OK_WAITING_PLEASE());
      } else return client.sendText(id, msg.NO_DOCUMENT_NUMBER());
    }

    if (
      status === "WAITING_PAYMENT_TYPE" &&
      (body.indexOf("PIX") >= 0 || body.indexOf("artão") >= 0)
    ) {
      statusManager.setStatus(id, "INIT");
      return socket.emit("getLink", id);
    }

    return client.sendButtons(id, ...toButton(msg.UNDESTEND));
  };

  client.onMessage((m) => {
    try {
      message(m);
    } catch (err) {
      console.error(err);
    }
  });

  (await client.getAllUnreadMessages()).forEach((a, i) => {
    console.log(a);
    setTimeout(
      async () => message(await client.getMessageById(a.id + "")),
      5000 * i
    );
  });
}
