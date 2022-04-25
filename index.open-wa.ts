import * as wa from "@open-wa/wa-automate";

wa.create({
  sessionId: "COVID_HELPER",
  multiDevice: false, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then((client: wa.Client) => start(client));

function start(client: wa.Client) {
  client.onMessage(async (message) => {
    if (message.body === "Hi") {
      await client.sendText(message.from, "👋 Hello!");
      client
        .sendButtons(message.from, "👋 Hello!", [{ id: "1", text: "dd" }])
        .then(console.log)
        .catch(console.error);
    }
  });
}
