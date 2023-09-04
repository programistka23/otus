<script setup>
import { ref, onMounted, onUpdated } from 'vue'
  import HeaderComponent from './components/header.vue'
  import MainComponent from './components/main.vue'
  import FooterComponent from './components/footer.vue'
  import { useRouter, useRoute } from 'vue-router'

  const user = ref({
    fio: 'Иванов Иван Иванович',
    email: 'ivanov@mail.ru',
    phone: '+7 777 777 77 77',
    birthDate: '2000-01-01',
    city: 'New York',
    street: 'Wall Street',
    house: '123'
  })

  const basket = ref([]);

  const balance = ref(100000);
  const isSidebar = ref(true);
  const isAuth = ref(false);
  const isAdded = ref(false);
  const searchStr = ref("");

  const router = useRouter();

  const addToBasket = (product) => {
    var count = +product.count || 1;
    var basketElem = basket.value.find((elem) => {
      return elem.id === product.id;
    })
    if (basketElem) {
      basketElem.count = +basketElem.count + count;
    } else {
      basket.value.push({
        id: product.id,
        count: count
      });
    }
    isAdded.value = true;
    localStorage.setItem("basket", JSON.stringify(basket.value));
  }

  const updateBasket = () => {
    if (localStorage.getItem("basket")) {
      basket.value = JSON.parse(localStorage.getItem("basket"));
    }
  }

  const login = (loginObj) => {
    user.value.auth = loginObj;
    localStorage.setItem("login", loginObj.login);
    isAuth.value = false;
    router.push('/New');
  }

  const logout = () => {
    user.value.auth = "";
    localStorage.removeItem("login");
  }

  onMounted(() => {
    if (localStorage.getItem("login")) {
      user.value.auth = {
        login: localStorage.getItem("login"),
        password: ""
      }
    }
  })
</script>

<template>
  <div>
    <HeaderComponent @toogle-sidebar="isSidebar = !isSidebar"
                     @search="searchStr = $event"
                     :user="user"
                     :balance="balance"
                     :basket="basket"
                     @update-basket="basket = $event"
                     @logout="logout();"
                     @showAuth="isAuth = true;"
                     :is-main-page="isMainPage"
    />
    <MainComponent :search = "searchStr"
                   :user="user"
                   :is-sidebar="isSidebar"
                   :is-auth="isAuth"
                   @add-to-basket="addToBasket($event);"
                   @update-basket="updateBasket();"
                   @login="login($event);"
                   @close-auth="isAuth = false;"

    />
    <v-snackbar v-model="isAdded" timeout="2000">
      Товар добавлен в корзину!
    </v-snackbar>
    <FooterComponent/>
  </div>
</template>

<style scoped>
</style>
