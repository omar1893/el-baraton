<template>
  <v-layout>
    <v-card class="w-100">
      <v-card-title>
        <div>
          <h3 class="headline mb-0">{{product.name}}</h3>
          <p><span><strong>Price:</strong></span> {{product.price}}</p>
          <p><span><strong>Quantity:</strong></span> {{product.quantity}}</p>
        </div>
        <v-btn color="green" @click="selected = product; sheet = !sheet" depressed v-if="product.available" dark small absolute bottom right fab>
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-btn color="grey" v-if="!product.available" dark small absolute bottom right fab>
          <v-icon>remove_shopping_cart</v-icon>
        </v-btn>
        <v-snackbar :timeout="timeout" top v-model="snack">
          Item Agregado 
          <v-btn flat color="pink" @click="snack = false">Close</v-btn>
        </v-snackbar>
        <bottom-sheet :sheet="sheet" :product="selected" v-on:ready="reset()"></bottom-sheet>
      </v-card-title>
    </v-card>
  </v-layout>
</template>

<script>
  import bottomSheet from './bottom-sheet'
  export default {
    props: ["product"],
    components: {
      bottomSheet
    },
    data() {
      return {
        sheet: null,
        selected: {},
        snack: false,
        timeout: 3000
      };
    },
    methods: {
      cartBtn: function(id) {
        this.sheet = true
      },
      reset: function() {
        this.sheet = false
        this.snack = true
      }
    },
  
  };
</script>

<style scoped>
  .btn--bottom.btn--absolute {
    bottom: -8px !important;
  }
</style>
