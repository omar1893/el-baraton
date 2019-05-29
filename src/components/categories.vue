<template>
<v-expansion-panel>
  <v-expansion-panel-content>
              <div slot="header">Categorías:</div>
              <v-expansion-panel v-for="cat in categories" :key="cat.id">
                <v-expansion-panel-content>
                  <div slot="header">{{cat.name}}:</div>
                  <div class="px-3">

                    <v-radio-group class="pa-0" v-model="filter.selected" v-for="options in cat.sublevels" :key="options.id" :mandatory="false">
                      <v-radio :label="options.name" :value="options.id"></v-radio>

                        <v-radio-group class="px-4 pa-0" v-model="filter.selected" v-for="suboptions in options.sublevels" :key="suboptions.id" :mandatory="false">
                          <v-radio :label="suboptions.name" :value="suboptions.id"></v-radio>
                            <v-radio-group class="px-5 pa-0" v-model="filter.selected" v-for="sublevel in suboptions.sublevels" :key="sublevel.id" :mandatory="false">
                                <v-radio :label="sublevel.name" :value="sublevel.id"></v-radio>
                            </v-radio-group>
                        </v-radio-group>

                    </v-radio-group>

                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
    </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import * as categories from "../json/categories.json";
export default {
  data() {
    return {
      categories: categories,
      selected: null,
      filter:{
          type:'category',
          selected:null
      }
    };
  },
  watch:{
      filter:{
          handler: function(val, oldVal){
              console.log(this.filter)
              this.$store.commit("filterArticles", this.filter);
        },
        deep: true
      },
  }
};
</script>

<style>
.radio-group .input-group__details {
  display: none;
}
</style>
