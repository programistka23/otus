import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'

import './style.css'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createPinia } from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(vuetify, {
  iconfont: 'mdi'
});

import ContentComponent from './components/content.vue'
import Product from './views/productNew.vue'
import Basket from './views/basket.vue'
import ProductPage from './views/productPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: ContentComponent },
  { path: '/MainPage', component: ContentComponent, props: route => ({ search: route.query.search, filter: route.query.filter })},
  { path: '/New', component: Product, meta: { requiresAuth: true } },
  { path: '/Basket', component: Basket },
  { path: '/Product/:id', component: ProductPage, meta: { requiresAuth: true } },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("login")) {
    alert('User is not authorized!');
    return {
      path: "/"
    }
  } else {
    next();
  }
})

app.use(router);

app.use(createPinia())

app.mount('#app');