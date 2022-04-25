<template>
  <div class="mt-12">
    <h1>Consultas pendentes</h1>
    <consult-item
      v-for="item in list"
      class="mb-8"
      :data="item"
      :key="item.document_number"
    />
  </div>
</template>
<script>
import ConsultItem from "../components/ConsultItem.vue";

export default {
  components: { ConsultItem },
  name: "HomeView",
  data: () => ({
    list: null,
  }),
  created() {
    this.subscribe();
    this.$socket.on("reconnect", this.subscribe);
  },
  methods: {
    subscribe() {
      this.$socket.removeAllListeners("refreshList");

      this.$socket.on("refreshList", (list) => {
        console.log(list);
        this.list = list;
      });
      this.$socket.emit("iamAdmin");
    },
  },
};
</script>
