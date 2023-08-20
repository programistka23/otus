<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    isSidebar: Boolean
  })
</script>

<template>
  <div class="sidebar-block" v-if="props.isSidebar">
    <v-layout>
      <v-navigation-drawer>
        <v-list nav>
          <v-list-item prepend-icon="mdi-home" title="Home page" value="homepage"></v-list-item>
          <v-list-item prepend-icon="mdi-heart" title="Favorites" value="favorites"></v-list-item>
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