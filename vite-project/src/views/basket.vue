<script setup>
  import { ref, onMounted } from "vue"
  import axios from "axios";
  import { useBasketStore } from "../stores/basketStore.js";

  const basketStore = useBasketStore();

  const emit = defineEmits("order");

  const basketItems = ref([]);

  onMounted(() => {
    const basketArr = basketStore.basket;
    basketArr.forEach((item) => {
      axios
          .get('https://fakestoreapi.com/products/' + item.id)
          .then((response) => {
            var obj = response.data;
            obj.count = item.count;
            basketItems.value.push(obj);
          });
    })
  })
  const remove = (index) => {
    basketItems.value.splice(index, 1);
    saveBasket();
  }

  const saveBasket = () => {
    var arr = [];
    basketItems.value.forEach((el) => {
      arr.push({
        id: el.id,
        count: el.count
      })
    })
    basketStore.basket = arr;
  }
</script>

<template>
  <div class="basket">
    <v-card style="margin: 10px;">
      <v-card-title>
        Basket <v-btn @click="basketItems = [];saveBasket();">Clear</v-btn>
      </v-card-title>
      <template v-if="basketItems.length">
        <v-card-text v-for="(item, index) in basketItems" class="item">
          <table>
            <colgroup>
              <col width="50px">
              <col width="300px">
              <col width="100px">
              <col width="200px">
            </colgroup>
            <tr>
              <td rowspan="2" style="padding-right: 10px">
                <v-img :src="item.image" width="50px"></v-img>
              </td>
              <td>{{ item.title }}</td>
              <td rowspan="2" style="padding-right: 10px; padding-top: 10px;">
                <v-text-field type="number" v-model="item.count" variant="outlined" min="0" @change="saveBasket();"></v-text-field>
              </td>
              <td rowspan="2" style="padding-right: 10px; padding-top: 10px;">
                <v-text-field type="text" readonly="true" :value="item.price * item.count + '$'" variant="outlined"></v-text-field>
              </td>
              <td rowspan="2">
                <v-btn @click="remove(index);" prepend-icon="mdi-close-thick" color="red">Delete</v-btn>
              </td>
            </tr>
            <tr>
              <td>{{ item.price }}$</td>
            </tr>
          </table>
        </v-card-text>
        <v-card-text>
          <v-btn @click="emit('order');">Order</v-btn>
        </v-card-text>
      </template>
      <v-card-text v-else>
        Пусто
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
  .basket {
    width: 100%;
  }
  .basket .item {
    width: 100%;
  }
</style>