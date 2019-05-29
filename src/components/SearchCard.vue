<template>
    <v-dialog v-model="card" max-width="500px">
        <v-card>
          <v-card-title class="py-2">
            <h3>Buscar por Nombre:</h3>
          </v-card-title>
          <v-card-text class="py-2">
                <v-text-field label="Name" v-model="search.name" required></v-text-field>
          </v-card-text>
        <v-card-actions>
          <v-btn color="error" flat @click.stop="dialog=false">Cerrar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="searchName" flat>Filtrar</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      card: null,
      search:{
          type:'search',
          name: ''
      }
    };
  },
  methods:{
      searchName: function(){
          this.card = false
          this.$store.commit('filterArticles', this.search)
      }
  },
  watch: {
    card: {
      handler(val, oldVal) {
        !val ? this.$emit("resetCard") : null;
      }
    },
    dialog: {
      handler: function(val, oldVal) {
        this.card = val;
      }
    }
  }
};
</script>

<style>

</style>
