<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container" style="flex-direction: column; margin-top: 3vh;">
      <SearchBar  :action="searchModels" v-model="search_text"/>
      <div class="choice-panel">
        <TextButton :action="switchOfficial" :type="button_type" text="Official" :capsule="true" style="padding: 10px 20px;"/>
        <SelectBox default-value="Popular" :options="[
            {
              value: 'Popular',
              label: 'Popular'
            },
            {
              value: 'Latest',
              label: 'Latest'
            }
        ]" v-model="order" border="#6C8FA9" style="margin-left: .5vw;"/>
      </div>

      <div class="model-columns">
        <div class="model-column">
          <ModelCard 
            v-for="(model, index) in models.slice(0,5)"
            :key="index" 
            :name="model.name" 
            :sizes="model.types.split(',')"
            :num_down="model.numDown" 
            :update="formatDate(model.date)"
            :uname="model.uname"
          />
        </div>
        <div class="model-column">
          <ModelCard 
            v-for="(model, index) in models.slice(5)"
            :key="index" 
            :name="model.name" 
            :sizes="model.types.split(',')"
            :num_down="model.numDown" 
            :update="formatDate(model.date)"
            :uname="model.uname"
          />
        </div>
      </div>
      
      <PaginationSelector :total-pages="3" :current-page="page" @page-changed="handlePageChange" />
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import SearchBar from "@/components/SearchBar.vue";
import TextButton from "@/components/Button.vue";
import SelectBox from "@/components/SelectBox.vue";
import PaginationSelector from "@/components/Pagination.vue";
import ModelCard from "@/components/ModelCard.vue";
import {formatDate} from "@/utils/time";

export default {
  components: {ModelCard, PaginationSelector, SelectBox, TextButton, SearchBar, FooterBar, HeaderBar},
  data() {
    return {
      search_text: "",
      button_type: "tertiary",
      switchMap: {
        "tertiary": "primary",
        "primary": "tertiary",
      },
      order: "",
      page: 1,
      total: 10,
      models: []
    }
  },
  methods: {
    formatDate,
    searchModels(){

    },
    switchOfficial(){
      this.button_type = this.switchMap[this.button_type];
    },
    handlePageChange(page){
      this.page = page;
    }
  }
}
</script>

<style>
.choice-panel {
  display: flex;
  margin-top: .5vh;
}
</style>