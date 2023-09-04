<script setup>
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const emit = defineEmits(["toogleSidebar", "search", "logout", "showAuth", "filter"]);

  const toogleSidebar = () => {
    emit('toogleSidebar');
  };

  const search = () => {
    emit('search', searchValue);
  };

  const props = defineProps({
    user: Object,
    balance:  Number,
    basket: Array,
  })

  const searchValue = ref("");

  const priceFilterMenu = ref(false);
  const minPrice = ref(0);
  const maxPrice = ref(0);

  const router = useRouter();
  const route = useRoute();

  const updateFilter = (isFilter) => {
    var filterStr = "";
    if (isFilter) {
      filterStr = '&filter={' + '"minPrice":' + minPrice.value + ',"maxPrice":' + maxPrice.value + '}'
    }
    router.push('/MainPage?search=' + searchValue.value + filterStr)
  }

  const isMainPage = ref(false);

  watch(() => route.path, () => {
    var currentRoute = router.currentRoute.value.path;
    isMainPage.value = (currentRoute === '/' || currentRoute === '/MainPage');
  })
</script>

<template>
  <div class="header">
    <v-toolbar
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="toogleSidebar" style="color: white;"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-weight: bold; color: white; width: 300px;">
        <router-link to="/" style="color: white; text-decoration: none !important;">
          Vue test shop
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-if="isMainPage">
        <label style="color: white;">Search: <input type="text" v-model="searchValue" @change="$router.push('/MainPage?search=' + $event.target.value)"/></label>
        <v-spacer></v-spacer>

        <v-menu
            v-model="priceFilterMenu"
            :close-on-content-click="false"
            location="bottom"
        >
          <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                color="white"
            >
              Price filter
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-card-text>
              <table>
                <tr>
                  <td><v-text-field type="number" label="Price from" min="0" v-model="minPrice"></v-text-field></td>
                  <td><v-text-field type="number" label="Price to" :min="minPrice" v-model="maxPrice"></v-text-field></td>
                </tr>
              </table>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  variant="text"
                  prepend-icon="mdi-filter"
                  @click="updateFilter(true);"
              >
                Filter
              </v-btn>
              <v-btn
                  variant="text"
                  @click="updateFilter(false)"
              >
                Clear filter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-spacer></v-spacer>
      </template>

      <span style="color: white;">User: {{ props.user.auth ? props.user.auth.login : 'Not authorized'}}
        <v-btn v-if="props.user.auth" icon="mdi-logout" @click="emit('logout');"></v-btn>
        <v-btn v-else icon="mdi-login" @click="emit('showAuth');"></v-btn>
      </span>

      <span style="color: white">Balance: {{props.balance}} $</span>

      <v-btn icon class="basket-btn" @click="$router.push('/Basket?basket=' + JSON.stringify(props.basket));">
        <v-icon size="x-large">mdi-basket</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    height: 64px;
    width: 100%;
    z-index: 100;
  }
  .header .v-spacer {
    flex-grow: 0.5;
  }
  .basket-btn {
    color: white;
  }
  input[type="text"] {
    background: white;
    padding: 2px 4px;
  }
</style>