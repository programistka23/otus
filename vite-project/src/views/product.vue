<script setup>
  import { ref } from 'vue'
  const productObj = ref({
    id: 0,
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0
    }
  })
</script>

<template>
  <div class="product-block">
    <v-card>
      <v-card-title>New product</v-card-title>
      <v-card-text>
        <v-text-field label="Title" v-model="productObj.title"/>
        <v-textarea label="Description" v-model="productObj.description"/>
        <v-text-field label="Price" type="number" v-model="productObj.price"/>
        <v-select label="Category"
                  v-model="productObj.category"
                  :items="['men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing']"/>
        <v-text-field label="Image" v-model="productObj.image"/>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
  .product-block {
    padding: 10px;
    width: 100%;
  }
</style>