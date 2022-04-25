<template>
  <v-app style="background: #eee">
    <v-main>
      <v-container style="max-width: 600px">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
