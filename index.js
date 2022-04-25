const venom = require("venom-bot");

venom
  .create({
    session: "dsadsds", //name of session
    multidevice: false, // for version not multidevice use false.(default: true)
    //   browserSessionToken: {
    //     WABrowserId: '"dzk/vcWWOM+IHVgt8FwB/Q=="',
    //     WASecretBundle:
    //       '{"key":"WqMpuybbzt40TnJhv3jUr85seuglHWr5iM8LjvHZtAY=","encKey":"Q0+GMWSCp9F6oE/ZiqyzrZkdSua5ZHquBRc9sBLS5wM=","macKey":"WqMpuybbzt40TnJhv3jUr85seuglHWr5iM8LjvHZtAY="}',
    //     WAToken1: '"6EtgNxuwXye3fpe3vtzoIu/uwcoVgvScjEoFOxkBuBk="',
    //     WAToken2:
    //       '"1@iO8aoQZK0S3OLhG1xcuWbc2WCbxKesyGx2r9Y7BXLxjL4Wo8Jzcj0lULlXe62Vp6tlJ+X9yKvJBPHg=="',
    //   },
  })
  .then((client) => start(client))
  .catch(console.error);

const start = (c) => {
  //   c.getAllUnreadMessages().then(console.log);
  c.sendButtons(
    "553492263220@c.us",
    "Olá! Quantas horas?",
    [
      { buttonText: { displayText: "15h" } },
      { buttonText: { displayText: "21h" } },
    ],
    "Vamos ver se vc acerta"
  ).catch(console.error);
};
