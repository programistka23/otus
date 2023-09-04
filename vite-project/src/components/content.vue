<script setup>
  import { ref, onMounted, watch, onUpdated } from 'vue'
  import ProductCard from './productItem.vue'
  import axios from 'axios'

  const emit = defineEmits("addToBasket");

  const props = defineProps({
    search: String,
    filter: String
  })

  const arr = ref([]);
  const filteredArr = ref([]);

  const update = () => {
    if (props.search) {
      filteredArr.value = arr.value.filter(item => item.title.toLowerCase().indexOf(props.search.toLowerCase()) > 0)
    } else {
      filteredArr.value = arr.value;
    }
    if (props.filter) {
      onFilter();
    }
  }

  onMounted(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        arr.value = response.data;
        filteredArr.value = response.data;
        update();
      });
  });

  onUpdated(() => {
    update();
  })

  const onFilter = () => {
    var filterObj = JSON.parse(props.filter);
    filteredArr.value = filteredArr.value.filter(item => item.price >= filterObj.minPrice && item.price <= filterObj.maxPrice);
  }

  const clearFilter = () => {
    filteredArr.value = arr.value;
  }
</script>

<template>
  <div class="content-block">
    <v-item-group selected-class="bg-primary">
      <v-row>
        <v-col
          v-for="item in filteredArr"
          :key="item.id"
          cols="12"
          md="3"
        >
          <ProductCard :product="item" @add-to-basket="emit('addToBasket', $event)"/>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>

<style scoped>
  .content-block {
    padding: 10px;
  }
</style>