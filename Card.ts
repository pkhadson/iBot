// @ts-nocheck
import Trello from "trello";

const LIST_ID = "61b36677e60fb9195cbb6968";
const BOARD_ID = "61b366700ee8180feaaab1be";

const members = {
  izabella: "5f85ca4c7d31e1304ff5c420",
};

interface CardCreate {
  person: "izabella";
  name: "";
  phone: "";
}

// export class Card {
// constructor()
// }

// new Card({})

console.log(Trello);
const trello = new Trello(
  "ccfca46f9d9a08350606615a717dd581",
  "ec80e84f23d47e8f9e3d97100822cc22d554774f64add614c5a00f7ef841c745"
);

trello.getCard(BOARD_ID, "6243903e3fff355cbd387336", console.log);

// trello.addCard(
//   "Clean car",
//   "Wax on, wax off",
//   LIST_ID,
//   function (error: any, trelloCard: any) {
//     if (error) return console.error(err);

//     console.log(trelloCard.id);
//     trello.addMemberToCard(trelloCard.id, members.izabella);
//     trello.addAttachmentToCard(
//       trelloCard.id,
//       "https://pps.whatsapp.net/v/t61.24694-24/166090967_469293974843753_528793817853231257_n.jpg?ccb=11-4&oh=9582dc9b05ae3c1bb81c57d15c1edc93&oe=6249B12B"
//     );
//   }
// );

console.log(trello);
