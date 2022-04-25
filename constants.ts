const welcomes = [
  "Olá!",
  "Olá! Tudo bem?",
  "Tudo bem?",
  "Oi! Tudo bem?",
  "Como vai?",
  "Oi! como vai?",
  "Olá! Como vai?",
];

export const msg = {
  WELCOME: () =>
    welcomes[Math.floor(Math.random() * welcomes.length)] +
    "\nVc pode falar agora?",

  PRESENTATION: () =>
    "Meu nome é *Eva* sou 🤖 assistente virtual do Grupo Evera.",

  START_QUESTION: () => [
    "Trabalhamos com soluções financeiras para pessoas quem tem restrições no *Serasa, SPC ou Boa Vista*. Da forma que fazendo você não paga nada de juros da dívida, e tem um desconto muito bom, podendo chegar á 95% do original valor da divida.\n\nPosso te fazer algumas perguntas?",
    ["Não", "Sim, pode perguntar"],
  ],
  MAIN_QUESTION: () => [
    "Você tem alguma restrições/dívidas em seu CPF?",
    ["Sim", "Não"],
  ],
  HAS: () =>
    "Entendi! Eu tenho a melhor oportunidade pra você se livrar dessa dívida e de qualquer cobrança.",

  SCHEDULE_QUESTION: () => [
    "Vamos marcar um bate papo?",
    ["Manhã", "Tarde"],
    "Me diz qual horário podemos marcar?",
  ],
  OK_SCHEDULED: () =>
    "Ok! Em breve vou te ligar para confirmarmos o agendamento",

  TKS: () =>
    "Ta bom! Muito obrigado!\n\nCaso queira indicar um amigo você ganha R$50. Se não tiver nenhum amigo para indicar, vou te mandar o link de nosso material de divulgação, se você postar em suas redes sociais e alguem se interessar, você recebe os R$50.\n\nhttps://bit.ly/3vIlu9t",

  UNDESTEND: () => [
    "Hmmmm... Não consegui entender sua mensagem. ",
    ["Começar novamente"],
    "Deseja voltar ao inicio?",
  ],

  QUESTION_DOCUMENT_NUMBER: () =>
    "Certo! Vou consultar o valor de sua dívida para que eu possa te passar o valor e o desconto. *Digite o seu CPF:*",

  OK_WAITING: () =>
    "Ok! Aguarde um instânte enquanto eu consulto o valor e formulo uma proposta",

  NO_DOCUMENT_NUMBER: () =>
    'Hmmm... Não consegui validar o seu CPF. \n_Caso não queira informar o seu CPF, volte ao inicio digital "Começar novamente"_',

  OK_WAITING_PLEASE: () =>
    "Aguarde enquanto estamos consultando o valor de suas restições e formulando um proposta.",

  QUESTON_TYPE: () => [
    "Como você prefere continuar o atendimento?",
    ["Falar com atendente 👩 ", "Continuar com o robô 🤖"],
    "Caso queira falar com a atendente, vamos transferir o seu atendimento",
  ],

  QUESTION_PAYMENT: () => [
    "Como deseja pagar?",
    ["Até 4x no Cartão (c/ juros)", "PIX (c/ desconto)"],
  ],
};
