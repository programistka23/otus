<script setup>
  import { ref, onMounted, onUpdated } from 'vue'
  import HeaderComponent from './components/header.vue'
  import MainComponent from './components/main.vue'
  import FooterComponent from './components/footer.vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from "./stores/store.js";

  const store = useStore();

  const balance = ref(100000);
  const isSidebar = ref(true);
  const isAuth = ref(false);
  const isAdded = ref(false);
  const searchStr = ref("");

  const router = useRouter();

  const login = (loginObj) => {
    store.user.auth = loginObj;
    localStorage.setItem("login", loginObj.login);
    isAuth.value = false;
    router.push('/New');
  }

  const logout = () => {
    store.user.auth = {
      login: "",
      password: ""
    };
    localStorage.removeItem("login");
  }

  onMounted(() => {
    if (localStorage.getItem("login")) {
      store.user.auth = {
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
                     :user="store.user"
                     :balance="balance"
                     @logout="logout();"
                     @showAuth="isAuth = true;"
    />
    <MainComponent :search = "searchStr"
                   :user="store.user"
                   :is-sidebar="isSidebar"
                   :is-auth="isAuth"
                   @add-to-basket="isAdded=true;"
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
