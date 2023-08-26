<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    isSidebar: Boolean
  })

  const emit = defineEmits(["order", "newProduct", "homePage"]);

  const order = () => {
    emit('order');
  };
  const newProduct = () => {
    emit('newProduct');
  };
  const homePage = () => {
    emit('homePage');
  };
</script>

<template>
  <div class="sidebar-block" v-if="props.isSidebar">
    <v-layout>
      <v-navigation-drawer>
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="Home page" value="homepage" @click="homePage"></v-list-item>
          <v-list-item prepend-icon="mdi-order" title="Order" value="order" @click="order"></v-list-item>
          <v-list-item prepend-icon="mdi-order" title="New product" value="new" @click="newProduct"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </div>
</template>

<style scoped>
  .v-navigation-drawer {
    top: 64px !important;
    bottom: 40px !important;
    height: auto !important;
  }
</style>