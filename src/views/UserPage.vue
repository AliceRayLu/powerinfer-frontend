<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="user-column sub-container">
        <div class="text-title text-bold">{{uname}}</div>
        <div class="text-subtitle">{{email}}</div>
        <div class="text-body">{{bio}}</div>
      </div>

      <div class="model-column sub-container">
        <div class="top-bar">
          <SearchBar :action="searchModels" v-model="search_text" />
          <SelectBox default-value="numDown" :options="[
              {
                value: 'numDown',
                label: 'Popular',
              },
              {
                value: 'date',
                label: 'Latest',
              }
          ]" v-model="order" border="#6C8FA9" style="margin-left: .5vw;"/>
        </div>
        <div class="model-card-container">
          <div style="height: 100%;" v-if="models.length > 0">
            <ModelCard
                v-for="model in models"
                :key="model.mid"
                type="underlined"
                :name="model.name"
                :num_down="model.numDown"
                :update="formatDate(model.date)"
                :sizes="(model.types && model.types.length > 0) ? model.types.split(',') : []"
                :uname="uname"
                :visibility="isSelf ? model.visibility : null"
            />
          </div>
          <PaginationSelector :total-pages="total" :current-page="page"
                              style="margin-top: 1vh;" v-if="models.length > 0" />
          <div v-else class="text-title text-bold" style="margin-top: 20vh;">
            No models found.
          </div>
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import service from "@/utils/index";
import { mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";
import SelectBox from "@/components/SelectBox.vue";
import ModelCard from "@/components/ModelCard.vue";
import PaginationSelector from "@/components/Pagination.vue";
import {formatDate} from "@/utils/time";

export default{
  components: {PaginationSelector, ModelCard, SelectBox, SearchBar, FooterBar, HeaderBar},
  computed: {
    ...mapState(["userId"])
  },
  data(){
    return {
      uname: "",
      email: "",
      bio: "",
      search_text: "",
      models: [],
      order: "numDown",
      isSelf: false,
      page: 1,
      total: 1,
      pageSize: 6
    }
  },
  watch:{
    order(newVal) {
      if(newVal){
        this.searchModels()
      }
    }
  },
  mounted() {
    const name = this.$route.params.uname;
    this.uname = name;
    service.post("/usr/getInfo", null, {
      params: {
        uid: this.userId,
        uname: name || "",
      }
    }).then(res =>{
      let user = res.data;
      this.uname = user.name;
      this.email = user.email;
      this.bio = user.bio;
      this.isSelf = user.uid === this.userId;
      console.log(this.isSelf);
      this.searchModels();
    })
  },
  methods: {
    formatDate,
    searchModels(){
      let url = "/model/usr/get";
      let body = {
        page: this.page,
        size: this.pageSize,
        sortBy: this.order,
        search: this.search_text,
      };
      if(this.isSelf) {
        url += "/own";
        body["user"] = this.userId;
      }else {
        body["user"] = this.uname;
      }
      service.post(url, body).then(res =>{
        console.log(res.data);
        this.page = 1;
        this.total = res.data.pages+1;
        this.models = res.data.records;
      })
    }
  }
}
</script>

<style>
.sub-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2vh;
}
.user-column {
  width: 30%;
}
.model-column {
  width: 70%;
  background-color: var(--white);
  padding: 1em;
}
.top-bar {
  width: 100%;
  display: flex;
  align-items: center;
}
.model-card-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
}
</style>