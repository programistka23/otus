<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(["toogleSidebar"]);

  const toogleSidebar = () => {
    emit('toogleSidebar');
  };

  const props = defineProps({
    user: Object,
    balance: Number,
    basket: Array
  })

</script>

<template>
  <div class="header">
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="toogleSidebar"></v-app-bar-nav-icon>

      <v-toolbar-title>Vue test shop</v-toolbar-title>

      <v-spacer></v-spacer>
      
      User: {{props.user.fio}}

      <v-spacer></v-spacer>

      <span style="color: white">Balance: {{props.balance}} $</span>

      <v-btn icon class="basket-btn">
        <v-icon size="x-large">mdi-basket</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    height: 64px;
    width: 100%;
    z-index: 100;
  }
  .basket-btn {
    color: white;
  }
</style>