{
  const mainMessage = `🚨 Limpe Seu Nome

Qual é o seu sonho?

💵 Investir em sua empresa?
🏡Sonha com a casa própria?
🚗 Comprar o seu carro?
💳 Cartão com limite alto ?

Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa se realizar, nós da Tc-Evera acreditamos e podemos te ajudar, dê o primeiro passo LIMPE O SEU NOME E RESTAURE SEU SCORE                                                                                                                        


✅ Digite 1 - Gostaria de receber atendimento e saber mais sobre

✅ Digite 2 - Sem interesse em limpar meu nome e restaurar o meu Score`;

  let waiting = (localStorage.waiting || "").split("|");

  const removeWaiting = (phone) => {
    waiting = waiting.filter((a) => a != phone);
    localStorage.setItem("waiting", waiting.join("|"));
  };

  const setWaiting = (phone) => {
    waiting.push(phone);
    localStorage.setItem("waiting", waiting.join("|"));
  };

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

  const getRandomMessage = () => {
    const messages =
      new Date().getHours() < 12 ? messagesTime.dia : messagesTime.tarde;

    return (
      messages[Math.floor(Math.random() * messages.length)] +
      "\nVc pode falar agora? 😊"
    );
  };

  const send = (phone) => {
    const id = "5534" + phone.substr(-8) + "@c.us";
    setWaiting(id);
    WAPI.sendMessage(id, getRandomMessage());
  };

  window.send = send;

  const onMessage = (message) => {
    if (message.fromMe) return;
    if (!waiting.includes(message.from))
      return console.log("MENSAGEM RECEBIDA - DESCARTADA");
    removeWaiting(message.from);

    WAPI.sendMessage(message.from, mainMessage);
  };

  WAPI.onAnyMessage(onMessage);
}
