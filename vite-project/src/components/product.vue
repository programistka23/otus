<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    product: Object,
  })
</script>

<template>
  <v-item v-slot="{ isSelected, selectedClass, toggle }">
    <v-card
      :class="['d-flex align-center', selectedClass]"
      dark
      height="400"
      @click="toggle"
      :title="props.product.title"
      :subtitle="props.product.category"              
    >
      <v-img
        :width="200"
        :src="props.product.image"
      ></v-img>
      <div class="price">{{props.product.price}} $</div>
    </v-card>
  </v-item>
</template>

<style scoped>
  .v-card {
    flex-direction: column;
    padding-bottom: 20px;
  }
  .v-card-item {
    width: 100%;
  }
  .price {
    position: absolute;
    bottom: 20px;
    padding: 3px 5px;
    background-color: red;
    font-weight: bold;
  }
</style>