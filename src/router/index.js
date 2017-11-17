import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import Cart from '@/components/Cart'

Vue.use(Router, Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cart',
      component: Cart
    },
  ]
})
