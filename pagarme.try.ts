import { writeFileSync } from "fs";
import Axios from "axios";
// import pagarme from "pagarme";

const client = Axios.create({
  baseURL: "https://api.pagar.me/core/v5/",
  auth: {
    username: [
      "sk_4nkMLz5UQXF41r1b",
      "sk_xQOPlYdu",
      "",
      "asdliouhopiuhopioinpoinpoinpoin",
    ][0],
    password: "",
  },
});

const amount = 7000 + Math.round(Math.random() * 1000);

// client.(
// API;
// ak_test_mFLODEXANIRdHTHNQl5PeL0P81lOlY;
// Criptografia;
// ek_test_54QfNjhsHqXsw7XNE2nbHVVmkeewZ1

let id_pedido = null;
let pedido;

(async () => {
  const payload = {
    items: [
      {
        amount: 3000,
        description: "Chaveiro do Teressact",
        quantity: 1,
      },
    ],
    customer: {
      name: "Tony Stark",
    },
    payments: [
      {
        amount: 3000,
        payment_method: "checkout",
        checkout: {
          expires_in: 120,
          billing_address_editable: false,
          customer_editable: true,
          accepted_payment_methods: ["credit_card", "boleto"],
          success_url: "https://www.pagar.me",
          boleto: {
            bank: "033",
            instructions: "Pagar até o vencimento",
            due_at: "2022-07-25T00:00:00Z",
          },
          credit_card: {
            installments: [
              {
                number: 1,
                total: 3000,
              },
              {
                number: 2,
                total: 3500,
              },
            ],
          },
        },
      },
    ],
  };
  console.log("oi");
  client
    .post("orders", payload)
    .then(({ data }) => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
})();
