<template>
  <v-card elevation="2">
    <v-card-text>
      <v-list-item class="pa-0 mt-n2">
        <v-list-item-avatar class="pa-0">
          <v-avatar>
            <v-img
              v-if="data.client_picture"
              :src="data.client_picture"
              alt="Foto de perfil"
            />
            <v-icon v-else> mdi-account</v-icon>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ data.client_name }}</v-list-item-title>
          <v-list-item-subtitle>{{ data.client_number }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer />

        <v-list-item-action class="flex-row d-flex flex-nowrap">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                size="sm"
                class="mr-4"
                @click="discard"
              >
                <v-icon> mdi-delete-outline</v-icon>
              </v-btn>
            </template>
            <span>Excluir</span>
          </v-tooltip>

          <v-chip small class="ma-1">{{ data.botIndentify }}</v-chip>
          <v-chip color="warning" small class="ma-1">Pendente</v-chip>
        </v-list-item-action>
      </v-list-item>
      <v-divider class="my-4" />
      <div class="d-flex justify-space-between align-center">
        <div>
          <span class="text-caption">CPF:</span>
          <span class="font-weight-bold text_copy">{{
            data.document_number | cpf
          }}</span>
          <v-btn icon x-small class="ml-1" @click="copy">
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </div>
        <v-form class="d-flex align-center" @submit.prevent="submit">
          <v-text-field
            height="20px"
            class="pa-0"
            filled
            dense
            hide-details
            label="Valor da dívida"
            v-money="money"
            v-model="amount"
          />
          <v-btn
            x-small
            height="50px"
            width="50px"
            class="ml-4"
            color="primary"
            type="submit"
            :disabled="!amount || amount == 'R$ 0,00'"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { cpf } from "cpf-cnpj-validator";

export default {
  name: "ConsultItem",
  props: ["data"],
  data: () => ({
    amount: 0,
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      precision: 2,
      masked: false,
    },
  }),
  methods: {
    copy() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.data.document_number);
      } else {
        window.text_copy.select();
        document.execCommand("copy");
      }
    },
    submit() {
      if (this.amount == 0 || this.amount === "R$ 0,00") return;
      this.$socket.emit("debitAmount", {
        id: this.data.id,
        debit_amount: this.amount.replace(/[^0-9]/g, ""),
      });
    },

    discard() {
      this.$socket.emit("discard", { id: this.data.id });
    },
  },
  filters: {
    cpf(v) {
      return cpf.format(v);
    },
  },
};
</script>

<style></style>
