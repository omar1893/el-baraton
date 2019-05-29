<template>
    <v-dialog v-model="buy" max-width="500px">
        <v-card>
          <v-card-title class="py-2">
            <h3>Realizar compra:</h3>
          </v-card-title>
          <v-card-text class="py-2">
                <!-- <v-text-field label="Name" v-model="search.name" required></v-text-field> -->
                El precio total de todos los artículos de su carrito: ${{this.totalAmount}}
          </v-card-text>
        <v-card-actions>
          <v-btn color="error" flat @click.stop="buy=false">Cerrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="buyCart" flat>Comprar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["cart"],
  data() {
    return {
      buy: null,
      totalAmount: null
    };
  },
  methods:{
      buyCart: function(){
        this.buy = false
        this.$store.commit('buyCart')
      }
  },
  watch: {
    buy: {
      handler(val, oldVal) {
        !val ? this.$emit("resetCart") : null;
      }
    },
    cart: {
      handler: function(val, oldVal) {
        this.buy = val;
        val ? this.totalAmount = this.$store.getters.getTotalAmount : null
      }
    }
  }
};
</script>

<style>

</style>



