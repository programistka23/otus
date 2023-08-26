<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(["toogleSidebar", "search"]);

  const toogleSidebar = () => {
    emit('toogleSidebar');
  };

  const search = () => {
    emit('search', searchValue);
  };

  const props = defineProps({
    user: Object,
    balance:  Number,
    basket: Array
  })

  const searchValue = ref("");
</script>

<template>
  <div class="header">
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="toogleSidebar" style="color: white;"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-weight: bold; color: white;">Vue test shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="color: white;">User: {{props.user.fio}}</span>
      <v-spacer></v-spacer>
      <label style="color: white;">Search: <input type="text" v-model="searchValue" @input="search"/></label>
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
  input[type="text"] {
    background: white;
    padding: 2px 4px;
  }
</style>