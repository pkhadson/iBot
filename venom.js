const venom = require("venom-bot");

venom
  .create({
    session: "BelaIza", //name of session
    multidevice: false, // for version not multidevice use false.(default: true)
    headless: false,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    const buttons = [
      {
        buttonText: {
          displayText: "Text of Button 1",
        },
      },
      {
        buttonText: {
          displayText: "Text of Button 2",
        },
      },
    ];
    client.sendButtons("553499744352@c.us", "Title", buttons, "Description");

    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
