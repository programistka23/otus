<script setup>
  import { ref, onMounted } from 'vue'
  import axios from "axios"
  import { useRoute } from "vue-router"

  const emit = defineEmits("addToBasket");

  const product = ref({});

  onMounted(() => {
    axios
        .get('https://fakestoreapi.com/products/' + useRoute().params.id)
        .then((response) => {
          product.value = response.data;
          product.value.count = 0;
        });
  })

  const addToBasket = (product) => {
    emit("addToBasket", product);
  }
</script>

<template>
  <div class="info">
    <v-card>
      <v-card-title>
        {{ product.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ product.category }}
      </v-card-subtitle>
      <v-card-text>
        <v-img :src="product.image" width="300px"></v-img>
      </v-card-text>
      <v-card-text>
        <span style="background-color: red; padding: 10px; font-weight: bold;">{{ product.price }}$</span>
      </v-card-text>
      <v-card-text>
        {{ product.description }}
      </v-card-text>
      <v-card-actions>
        <div style="width: 100px; margin-right: 20px">
          <v-text-field type="number" min="0" variant="outlined" v-model="product.count"></v-text-field>
        </div>
        <v-btn variant="outlined" @click="addToBasket(product);">В корзину</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
  .info {
    margin: 10px;
    width: 100%;
  }
</style>