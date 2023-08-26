<script setup>
  import { ref, onMounted } from 'vue'
  import HeaderComponent from './components/header.vue'
  import MainComponent from './components/main.vue'
  import FooterComponent from './components/footer.vue'
  import axios from 'axios'

  const arr = ref([]);
  const filteredArr = ref([]);

  onMounted(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        arr.value = response.data;
        filteredArr.value = response.data;
      });
  });
  
  const user = ref({
    fio: 'Иванов Иван Иванович',
    email: 'ivanov@mail.ru',
    birthDate: '2000-01-01',
    city: 'New York',
    street: 'Wall Street',
    house: '123'
  })

  const basket = ref([]);
  const balance = ref(100000);
  const isSidebar = ref(true);

  function onSearch(value) {
    if (value.value) {
      filteredArr.value = arr.value.filter(item => item.title.toLowerCase().indexOf(value.value.toLowerCase()) > 0)
    } else {
      filteredArr.value = arr.value;
    }
  }
</script>

<template>
  <div>
    <HeaderComponent @toogle-sidebar="isSidebar = !isSidebar"
                     @search="onSearch($event)"
                     :user="user"
                     :balance="balance"/>
    <MainComponent :products = "filteredArr"
                   :user="user"
                   :is-sidebar="isSidebar"/>
    <FooterComponent/>
  </div>
</template>

<style scoped>
</style>
