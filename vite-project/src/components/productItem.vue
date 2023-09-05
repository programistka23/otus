<script setup>
  import { useStore } from "../stores/store";

  const store = useStore();

  const emit = defineEmits("addToBasket");

  const props = defineProps({
    product: Object,
  })
</script>

<template>
  <v-item v-slot="{ isSelected, selectedClass }">
    <v-card
      :class="['d-flex align-center', selectedClass]"
      dark
      height="400"
      @click="$router.push('Product/' + props.product.id)"
      :title="props.product.title"
      :subtitle="props.product.category"              
    >
      <v-img
        :width="200"
        :src="props.product.image"
      ></v-img>
      <div class="price">{{props.product.price}} $</div>
      <v-btn class="buyBtn" @click.stop="store.addToBasket(props.product); emit('addToBasket');">В корзину</v-btn>
    </v-card>
  </v-item>
</template>

<style scoped>
  .v-card {
    flex-direction: column;
    padding-bottom: 20px;
    min-width: 300px;
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
  .buyBtn {
    position: absolute;
    top: 50%;
    opacity: 0.7;
  }
  .buyBtn:hover {
    opacity: 1;
  }
</style>