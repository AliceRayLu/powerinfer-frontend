<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container" style="flex-direction: column; margin-top: 3vh;">
      <div class="choice-panel">
        <SearchBar  :action="searchModels" v-model="search_text"/>
        <SelectBox default-value="numDown" :options="[
            {
              value: 'numDown',
              label: 'Popular'
            },
            {
              value: 'date',
              label: 'Latest'
            }
        ]" v-model="order" border="#6C8FA9" style="margin-left: .5vw;"/>
      </div>

      <div class="model-columns">
        <div class="model-column">
          <ModelCard 
            v-for="(model, index) in models.slice(0,columnSize)"
            :key="index" 
            :name="model.name" 
            :sizes="model.types.length > 0 ? model.types.split(',') : []"
            :num_down="model.numDown" 
            :update="formatDate(model.date)"
            :uname="model.uname"
            :show-uname="true"
          />
        </div>
        <div class="model-column">
          <ModelCard 
            v-for="(model, index) in models.slice(columnSize)"
            :key="index" 
            :name="model.name" 
            :sizes="model.types.length > 0 ? model.types.split(',') : []"
            :num_down="model.numDown" 
            :update="formatDate(model.date)"
            :uname="model.uname"
            :show-uname="true"
          />
        </div>
      </div>
      
      <div class="pagination-container">
        <PaginationSelector 
          :total-pages="total"
          :current-page="page"
          @page-changed="handlePageChange"
          :show="7"
        />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import SearchBar from "@/components/SearchBar.vue";
import SelectBox from "@/components/SelectBox.vue";
import PaginationSelector from "@/components/Pagination.vue";
import ModelCard from "@/components/ModelCard.vue";
import {formatDate} from "@/utils/time";
import service from "@/utils";

export default {
  components: {ModelCard, PaginationSelector, SelectBox, SearchBar, FooterBar, HeaderBar},
  data() {
    return {
      search_text: "",
      switchMap: {
        "tertiary": "primary",
        "primary": "tertiary",
      },
      order: "numDown",
      page: 1,
      columnSize: 5,
      total: 10,
      models: []
    }
  },
  watch:{
    order(newVal) {
      if(newVal){
        this.searchModels()
      }
    }
  },
  methods: {
    formatDate,
    searchModels(){
      service.post("/model/pub/get", {
        page: this.page,
        size: this.columnSize * 2,
        sortBy: this.order,
        search: this.search_text
      }).then(res => {
        console.log(res.data);
        this.total = res.data.pages+1;
        this.models = res.data.records;
        this.page = 1;
      })
    },
    handlePageChange(page){
      this.page = page;
    }
  },
  mounted() {
    this.searchModels()
  }
}
</script>

<style>
.choice-panel {
  display: flex;
  align-items: center;
}

.model-columns {
  display: flex;
  gap: 2rem;
  margin-top: 2vh;
  height: 100%;
}

.model-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pagination-container {
  margin-top: 1vh;
  margin-bottom: 1vh;
}
</style>