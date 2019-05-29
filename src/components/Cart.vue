<template>
  <v-container>
    <v-layout row wrap xs4>
  
      <v-flex xs12 sm6 md4 lg3 xl2 class="px-2 mb-3" v-for="product in products" :key="product.id">
        <card-product :product="product"></card-product>
      </v-flex>
  
    </v-layout>
  </v-container>
</template>

<script>
import cardProduct from "./card-product.vue"
import { mapGetters } from "vuex"
export default {
  components: {
    cardProduct
  },
  data() {
    return {
      products: []
    };
  },
  computed: {
    ...mapGetters({
      filteredProducts: "getProducts"
    })
  },
  methods: {
    setFirstProducts: function() {
      this.$store.dispatch("setArticles");
      this.products = this.$store.state.products;
    }
  },
  created() {
    this.setFirstProducts();
  },
  watch: {
    filteredProducts: {
      handler: function(val, oldVal) {
        this.products = this.filteredProducts;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.w-100 {
  width: 100%;
}
</style>
