<template>
    <v-bottom-sheet v-model="boolean" inset>
        <v-card tile>
            <v-card-title primary-title class="pa-1 text-xs-center">
                    <h5 class="headline mb-0 bs-title">¿Desea agregar este item a su carrito?</h5>
            </v-card-title>
            <v-list>
            <v-list-tile>
                <v-list-tile-content>
                <v-list-tile-title>{{product.name}}</v-list-tile-title>
                <v-list-tile-sub-title>{{product.price}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>

                <v-list-tile-action>
                    <v-btn color="error" @click="boolean = false" fab small dark>
                        <v-icon>clear</v-icon>
                    </v-btn>
                </v-list-tile-action>

                <v-list-tile-action>
                    <v-btn color="success" @click="setCart(product.id)" fab small dark>
                        <v-icon>done</v-icon>
                    </v-btn>
                </v-list-tile-action>

            </v-list-tile>
            </v-list>
        </v-card>
    </v-bottom-sheet>
</template>

<script>
export default {
  props: ["sheet", "product"],
  data() {
    return {
      boolean: null
    };
  },
  methods:{
      setCart: function(id){
          this.$store.dispatch('setNewItems', id)
          .then(data => this.$emit('ready'))
      }
  },
  watch: {
    sheet: {
      handler: function(val, oldVal) {
        this.boolean = val;
      }
    },
    boolean: {
      handler: function(val, oldVal) {
        if (val == false) {
          this.$emit("reset");
        }
      }
    }
  }
};
</script>

<style scoped>
.bs-title {
  margin: auto;
}
</style>
