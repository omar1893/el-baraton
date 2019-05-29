import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Cart from '@/components/Cart'
import userCart from '@/components/userCart.vue'

Vue.use(Router, Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/userCart',
      name: 'userCart',
      component: userCart
    },
  ]
})
