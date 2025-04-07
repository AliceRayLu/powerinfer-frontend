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
          <SelectBox default-value="Popular" :options="[
              {
                value: 'Popular',
                label: 'Popular',
              },
              {
                value: 'Latest',
                label: 'Latest',
              }
          ]" v-model="order" border="#6C8FA9" />
        </div>
        <div class="model-card-container">
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>
          <ModelCard type="underlined" name="modelname" num_down="1003" update="2025-03-23" :sizes="['3b','7b','13b','40b','1024b']" :uname="uname"/>

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

export default{
  components: {ModelCard, SelectBox, SearchBar, FooterBar, HeaderBar},
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
      order: ""
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
    })
  },
  methods: {
    searchModels(){
      console.log(this.search_text);
    }
  }
}
</script>

<style>
.sub-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 3vh;
}
.user-column {
  width: 30%;
}
.model-column {
  width: 70%;
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
}
</style>