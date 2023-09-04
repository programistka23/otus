<script setup xmlns:v-card-actions="http://www.w3.org/1999/xlink">
import {onMounted, ref} from 'vue'
  import { useField, useForm } from 'vee-validate';
  import axios from 'axios'

  const isLoading = ref(false);

  const clear = () => {
    title.value.value = "";
    description.value.value = "";
    price.value.value = 0;
    category.value.value = "electronics";
    image.value.value = "";
  }

  const { handleSubmit } = useForm({
    validationSchema: {
      title(value) {
        if (value?.length >= 2) return true
        return 'Title needs to be at least 2 characters.'
      },
      description(value) {
        if (value?.length >= 2) return true
        return 'Description needs to be at least 2 characters.'
      },
      price(value) {
        if (+value > 0) return true
        return 'Price needs be more 0.'
      },
      image(value) {
        const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

        if (URL.test(value)) return true;
        return 'Enter a valid url'
      }
    },
  });

  const title = useField("title");
  const description = useField("description");
  const price = useField("price");
  const category = useField("category");
  const image = useField("image");

  onMounted(() => {
    category.value.value = "electronics";
  })

  const submit = handleSubmit(values => {
    isLoading.value = true;
    axios
        .post('https://fakestoreapi.com/products', {
          title: title.value.value,
          description: description.value.value,
          price: price.value.value,
          category: category.value.value,
          image: image.value.value
        })
        .then(response => {
          isLoading.value = false;
          alert('Товар добавлен: ' + JSON.stringify(response.data));
          clear();
        })
  })

</script>

<template>
  <div class="product-block">
    <form @submit.prevent="submit">
      <v-card :isLoading="isLoading">
        <v-card-title>New product</v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="title.value.value" :error-messages="title.errorMessage.value"/>
          <v-textarea label="Description" v-model="description.value.value" :error-messages="description.errorMessage.value"/>
          <v-text-field label="Price" type="number" v-model="price.value.value" :error-messages="price.errorMessage.value"/>
          <v-select label="Category"
                    v-model="category.value.value"
                    :error-messages="category.errorMessage.value"
                    :items="['men\'s clothing', 'jewelery', 'electronics', 'women\'s clothing']"/>
          <v-text-field label="Image" v-model="image.value.value" :error-messages="image.errorMessage.value"/>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" color="primary" @click="addNewProduct();">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<style scoped>
  .product-block {
    padding: 10px;
    width: 100%;
  }
</style>