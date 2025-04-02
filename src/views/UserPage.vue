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
        <SearchBar :action="searchModels" v-model="search_text" />
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import service from "@/utils";
import { mapState } from "vuex";
import SearchBar from "@/components/SearchBar.vue";

export default{
  components: {SearchBar, FooterBar, HeaderBar},
  computed: {
    ...mapState(["userId"])
  },
  data(){
    return {
      uname: "",
      email: "",
      bio: "",
      search_text: "",
      models: []
    }
  },
  mounted() {
    service.post("/usr/getInfo", null, {
      params: {
        uid: this.userId
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
</style>