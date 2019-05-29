import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as products from '../json/products.json'

// import  * as data from '../data.json'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  getters: {
    getProducts: state => state.products,

    getCart: state => state.cart,

    getTotalAmount: (state) => {
      const totalPrice = state.cart.reduce((total, product) => {return total + ( parseFloat(product.price.substring(1).replace(',', '')) * product.cartQtty)}, 0)
      return totalPrice.toLocaleString().replace('.',',')
    },
  },
  mutations: {
    initialProducts(state, data) {
      state.products = data;
    },
    initialCart(state){
      window.localStorage.cart ? state.cart = JSON.parse(window.localStorage.cart) : JSON.stringify(state.cart)
    },
    buyCart(state){
      state.cart = []
      window.localStorage.cart = JSON.stringify(state.cart)
    },
    deleteCart(state, idx){
      state.cart.splice(idx, 1)
      window.localStorage.cart = JSON.stringify(state.cart)
    },
    addQtty(state, idx){
      state.cart[idx].cartQtty++
      window.localStorage.cart = JSON.stringify(state.cart)
    },
    subsQtty(state, idx){
      state.cart[idx].cartQtty--
      window.localStorage.cart = JSON.stringify(state.cart)
    },
    sortArticles(state, order) {
      if (order == "quantity") state.products = products.sort((a, b) => a.quantity < b.quantity ? 1 : -1)
      else if (order == "available") state.products = products.sort((a, b) => a.available < b.available ? 1 : -1)
      else state.products = products.sort((a, b) => parseInt(a.price.substring(1)) < parseInt(b.price.substring(1)) ? 1 : -1)
    },
    filterArticles(state, filter) {
      console.log(filter)
      if (filter.type == 'available') {
        filter.order == "available" ? state.products = products.filter(product => product.available) : state.products = products.filter(product => !product.available)
      } else if (filter.type == 'quantity') {
        state.products = products.filter(product => product.quantity >= filter.min && product.quantity < filter.max)
      } else if (filter.type == 'price') {
        state.products = products.filter(product => parseInt(product.price.substring(1).replace(',', '')) >= filter.min && parseInt(product.price.substring(1).replace(',', '')) < filter.max)
      }
      else if(filter.type == 'category'){
        state.products = products.filter(product => product.sublevel_id == filter.selected)
      }
      else{
        state.products = products.filter(product => product.name.toLowerCase().includes(filter.name.toLowerCase()))
      }
    },
    setCart(state, prodObj) {
      console.log(prodObj)
      prodObj.exists ? state.cart[prodObj.idx].cartQtty++ : state.cart.push(prodObj.getProduct)
    },
  },
  actions: {
    setArticles(ctx) {
      axios.get('../../static/products.json')
      .then((data) => {
        console.log(data);
        ctx.commit('initialProducts', data.data.products)
      })
    },
    setNewItems(ctx, id) {
      return new Promise(function (resolve, reject) {
        const productObj = {}
        productObj.getProduct = ctx.state.products.find(product => product.id == `${id}`)
        productObj.exists = ctx.state.cart.some(product => product.id == `${productObj.getProduct.id}`)
        if (!productObj.exists) {
          productObj.getProduct.cartQtty = 1
          ctx.commit('setCart', productObj)
        } else {
          productObj.idx = ctx.state.cart.findIndex(product => product.id == `${productObj.getProduct.id}`)
          ctx.commit('setCart', productObj)
        }
        window.localStorage.cart = JSON.stringify(ctx.state.cart)
        resolve()
      })
    },
  }
})
