<script setup>
  import { ref } from 'vue'
  import SidebarComponent from './sidebar.vue'
  import ContentComponent from './content.vue'

  const props = defineProps({
    products: Array,
    isSidebar: Boolean
  })
</script>

<template>
  <div class="main-block">
    <SidebarComponent :is-sidebar="props.isSidebar"/>
    <ContentComponent :products="props.products"/>
  </div>
</template>

<style scoped>
  .main-block {
    display: flex;
    padding-top: 65px;
    padding-bottom: 40px;
  }
</style>