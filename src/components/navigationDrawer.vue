<template>
   <v-navigation-drawer temporary v-model="boolean" dark absolute>
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn router to="/userCart" icon>
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
  
        <v-flex xs12>
          <v-expansion-panel>
  
            <v-expansion-panel-content>
              <div slot="header">Ordenar por:</div>
              <div class="px-4">
                <v-radio-group class="mb-2 mt-2 pt-0" v-model="order" :mandatory="false">
                  <v-radio label="Precio" value="price"></v-radio>
                  <v-radio label="Disponibilidad" value="available"></v-radio>
                  <v-radio label="Cantidad" value="quantity"></v-radio>
                </v-radio-group>
              </div>
            </v-expansion-panel-content>
  
            <v-expansion-panel-content>
              
              <div slot="header">Filtrar Por:</div>
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div slot="header">Disponibilidad:</div>
                  <div class="px-4">
                    <v-radio-group class="mb-2 mt-2" v-model="filterAvailable.order" :mandatory="false">
                      <v-radio label="Disponibles" value="available"></v-radio>
                      <v-radio label="No Disponibles" value="n/a"></v-radio>
                    </v-radio-group>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div slot="header">Rango de Precios: </div>
                  <div class="px-4">
                    <v-form v-model="filterByPrice.valid" ref="formPrice">
                      <v-text-field label="Precio Minimo" type="number" v-model="filterByPrice.min" required></v-text-field>
                      <v-text-field label="Precio Maximo" type="number" v-model="filterByPrice.max" required></v-text-field>
                      <v-btn @click="submitPrice" :disabled="!filterByPrice.valid">
                        Filtrar
                      </v-btn>
                    </v-form>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
  
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div slot="header">Cantidad: </div>
                  <div class="px-4">
                    <v-form v-model="filterByQtty.valid" ref="formQtty">
                      <v-text-field label="Min Items" type="number" v-model="filterByQtty.min" required></v-text-field>
                      <v-text-field label="Max Items" type="number" v-model="filterByQtty.max" required></v-text-field>
                      <v-btn @click="submitQtty" :disabled="!filterByQtty.valid">
                        Filtrar
                      </v-btn>
                    </v-form>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>

  
            </v-expansion-panel-content>
              <categories></categories>
  
          </v-expansion-panel>
        </v-flex>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import categories from './categories'

export default {
  props: ["drawer"],
  components:{
    categories
  },
  data() {
    return {
      order: null,
      boolean: null, 
      filterAvailable: {
        type: "available",
        order: null
      },
      filterByPrice: {
        type: "price",
        valid: true,
        min: null,
        max: null
      },
      filterByQtty: {
        type: "quantity",
        valid: true,
        min: null,
        max: null
      }
    };
  },
  methods: {
    orderBy: function() {
      this.$store.commit("sortArticles", this.order);
    },
    filterBy: function(filter) {
      this.$store.commit("filterArticles", filter);
    },
    submitQtty: function() {
      this.filterByQtty.min < this.filterByQtty.max ? this.filterBy(this.filterByQtty) : null
    },
    submitPrice: function() {
      this.filterByPrice.min < this.filterByPrice.max ? this.filterBy(this.filterByPrice) : null
    } 
  },
  watch: {
    order: {
      handler: function(val, oldVal) {
        this.orderBy();
      }
    },
    filterAvailable: {
      handler: function(val, oldVal) {
        this.filterBy(this.filterAvailable);
      },
      deep: true
    },
    drawer: {
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

<style>

</style>
