<template>
    <v-layout>
        <v-list two-line class="w-100">
    
            <v-list-tile avatar ripple v-for="(item, index) in cart" class="mb-3" :key="item.name">
                <v-list-tile-content>
                    <v-list-tile-title>Nombre del Producto: {{ item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title class="grey--text text--darken-4">Cantidades: {{ item.cartQtty }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title class="grey--text text--darken-4">Precio Unitario: {{ item.price }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-btn flat icon @click="dialog = !dialog , product = item, idx = index" color="info">
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn flat icon @click="dialogDelete = !dialogDelete, product = item, idx = index" color="error">
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    
    
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <div class="w-100 text-xs-center">
                        <h2 class="product-title">{{product.name}}</h2>
                    </div>
                </v-card-title>
                <v-card-text class="flex-container">
                    <span>Cantidades: {{product.cartQtty}}</span>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn flat icon color="success" @click="add">
                            <v-icon>add_circle_outline</v-icon>
                        </v-btn>
                        <v-btn flat icon color="error" @click="substract">
                            <v-icon>remove_circle_outline</v-icon>
                        </v-btn>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" flat @click.stop="dialog=false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title>
                    <div class="w-100 text-xs-center">
                        <h3 class="product-title">¿Seguro que desea eliminar el producto "{{product.name}}" de su carrito?</h3>
                    </div>
                </v-card-title>
    
                <v-card-actions>
                    <v-btn color="primary" flat @click.stop="dialogDelete=false">Cerrar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" flat @click.stop="delCart()">Aceptar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    
        <v-snackbar :timeout="timeout" top v-model="snackDel">
            Item Borrado
            <v-btn flat color="pink" @click="snackDel = false">Cerrar</v-btn>
        </v-snackbar>
    
    </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cart: this.$store.state.cart,
      dialog: false,
      product: { cartQtty: 0 },
      idx: "",
      dialogDelete: false,
      snackDel: false,
      timeout: 3000
    };
  },
    computed: {
    ...mapGetters({
      cartChanged: "getCart"
    })
  },
  methods: {
    add() {
      this.$store.commit("addQtty", this.idx);
    },
    substract() {
      this.product.cartQtty > 1
        ? this.$store.commit("subsQtty", this.idx)
        : null;
    },
    delCart() {
      this.$store.commit("deleteCart", this.idx);
      this.dialogDelete = false;
      this.snackDel = true;
    }
  },
  created() {
    this.$store.commit("initialCart");
  },
  watch: {
    product: {
      handler(val, oldVal) {
        console.log("Cambio");
      },
      deep: true
    },
    cartChanged: {
        handler(val, oldVal){
          this.cart = val  
        }
    }
  }
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}

.product-title {
  margin: auto;
}

.flex-container {
  display: flex;
  align-items: center;
}
</style>
