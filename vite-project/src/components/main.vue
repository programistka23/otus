<script setup>
  import { ref, onUpdated } from 'vue'
  import SidebarComponent from './sidebar.vue'
  import OrderComponent from './order.vue'
  import AuthComponent from './auth.vue'
  import { useStore } from "../stores/store.js";

  const store = useStore();

  const emit = defineEmits("login", "closeAuth", "addToBasket");

  const props = defineProps({
    search: String,
    user: Object,
    isSidebar: Boolean,
    isAuth: Boolean,
    isFiltered: Boolean,
    minPrice: Number,
    maxPrice: Number,
  })

  const isOrderDialog = ref(false);
  const isAuthDialog = ref(false);

  onUpdated(() => {
    isAuthDialog.value = props.isAuth;
  })
</script>

<template>
  <div class="main-block">
      <SidebarComponent :is-sidebar="props.isSidebar"
                        @order="isOrderDialog = true;"
                        @new-product="$router.push('/New')"
                        @home-page="$router.push('/MainPage?search=' + props.search + (isFiltered ? 'filter={minPrice: ' + minPrice + ', maxPrice: ' + maxPrice + '}' : ''))"
                        @login="isAuthDialog = true;"
      />
      <router-view @add-to-basket="emit('addToBasket');"
                   @order="isOrderDialog = true;"
                   :is-filtered="isFiltered"
                   :min-price="minPrice"
                   :max-price="maxPrice"
      ></router-view>
      <OrderComponent :user="props.user"
                      :is-show="isOrderDialog"
                      @close-order="isOrderDialog = false;"
      />
      <AuthComponent
        :is-show="isAuthDialog"
        @close-auth="isAuthDialog = false; emit('closeAuth');"
        @login="emit('login', $event)"
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