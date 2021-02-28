import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import Catalog from '@/components/Catalog'
import Cart from '@/components/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router
