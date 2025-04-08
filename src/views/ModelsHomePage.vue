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
              label: 'Popular',
            },
            {
              value: 'Latest',
              label: 'Latest',
            }
        ]" v-model="order" border="#6C8FA9" style="margin-left: .5vw;"/>
      </div>
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

export default {
  components: {SelectBox, TextButton, SearchBar, FooterBar, HeaderBar},
  data() {
    return {
      search_text: "",
      button_type: "tertiary",
      switchMap: {
        "tertiary": "primary",
        "primary": "tertiary",
      },
      order: "",
    }
  },
  methods: {
    searchModels(){

    },
    switchOfficial(){
      this.button_type = this.switchMap[this.button_type];
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