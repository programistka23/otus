<script setup>
  import { ref, onMounted, watch, onUpdated } from 'vue'
  import ProductItem from './productItem.vue'
  import Products from "../services/products.js";
  import { useCatalogStore } from "../stores/catalogStore.js";
  import { useFilterStore } from "../stores/filterStore.js";

  const filterStore = useFilterStore();
  const catalogStore = useCatalogStore();

  const emit = defineEmits("addToBasket");

  const props = defineProps({
    search: String,
    filter: String
  })

  const items = ref([]);

  const update = () => {
    var tmpArr = [];
    if (props.search) {
      tmpArr = catalogStore.catalog.filter(item => item.title.toLowerCase().indexOf(props.search.toLowerCase()) > 0)
    } else {
      tmpArr = catalogStore.catalog;
    }
    if (props.filter) {
      tmpArr = filterStore.getFiltered(props.filter, tmpArr);
    }
    items.value = tmpArr;
  }

  onMounted(() => {
    Products.getData().then((response) => {
      catalogStore.catalog = response.data;
      items.value = response.data;
      update();
    })
  });

  onUpdated(() => {
    update();
  })
</script>

<template>
  <div class="content-block">
    <v-item-group selected-class="bg-primary">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          md="3"
        >
          <ProductItem :product="item" @add-to-basket="emit('addToBasket')"/>
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