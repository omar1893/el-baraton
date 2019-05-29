<template>
  <v-app light>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon v-show="root" @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" tag="span" class="router">
        <v-toolbar-title class="white--text">El Baratón</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-show="root" @click="card = !card" icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn v-show="!root" @click="cart = !cart" icon>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
    </v-toolbar>
  
    <navigation-drawer :drawer="drawer" v-on:reset="reset()"></navigation-drawer>
  
    <search-card :dialog="card" v-on:resetCard="resetCard"></search-card>
    <buy-card :cart="cart" v-on:resetCart="resetCart"></buy-card>

    <router-view>
    </router-view>
  
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import navigationDrawer from "./components/navigationDrawer";
import searchCard from "./components/SearchCard";
import buyCard from "./components/buy-card";

export default {
  components: {
    navigationDrawer,
    searchCard,
    buyCard
  },
  data() {
    return {
      drawer: null,
      selected: "",
      card: null,
      cart: null,
      root: true
    };
  },
  methods: {
    reset: function() {
      this.drawer = false;
    },
    resetCard: function() {
      this.card = false;
    },
    resetCart: function() {
      this.cart = false;
    }
  },
  created() {
    this.$store.commit("initialCart");
    // this.$store.commit("Cart");
    if (this.$route.path === "/") {
      this.root = true;
    } else {
      this.root = false;
    }
  },
  watch: {
    $route: function() {
      if (this.$route.path === "/") {
        this.root = true;
      } else {
        this.root = false;
      }
    }
  }
};
</script>

<style>
.router {
  cursor: pointer;
}
</style>

