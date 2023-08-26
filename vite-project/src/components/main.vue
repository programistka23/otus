<script setup>
  import { ref } from 'vue'
  import SidebarComponent from './sidebar.vue'
  import ContentComponent from './content.vue'
  import OrderComponent from './order.vue'
  import ProductComponent from '../views/product.vue'

  const props = defineProps({
    products: Array,
    user: Object,
    isSidebar: Boolean,
  })

  const isOrderDialog = ref(false);
  const isNewProduct = ref(false);
</script>

<template>
  <div class="main-block">
      <SidebarComponent :is-sidebar="props.isSidebar"
                        @order="isOrderDialog = true;"
                        @new-product="isNewProduct = true;"
                        @home-page="isNewProduct = false;"
      />
      <template v-if="isNewProduct">
        <ProductComponent/>
      </template>
      <template v-else>
        <ContentComponent :products="props.products"/>
      </template>
      <OrderComponent :user="props.user"
                      :is-show="isOrderDialog"
                      @close-order="isOrderDialog = false;"
      />
  </div>
</template>

<style scoped>
  .main-block {
    display: flex;
    padding-top: 65px;
    padding-bottom: 40px;
  }
</style>