<template>
  <div class="container" style="background-color: var(--white)">
    <HeaderBar />
    <div class="main-container center-container">
      <div class="text-title text-bold" style="margin-top: 20vh;">Creating a New Model...</div>
      <div class="text-hint text-bold text-margin">Model Name</div>
      <input class="text-input" v-model="mname" style="width: 62%;" @focus="hideHint"/>
      <div class="text-hint descriptions">You may not use special character '/' in the name.</div>
      <div class="text-hint text-margin" style="color: red;" v-if="showHint">{{hint}}</div>

      <div class="text-hint text-bold" style="margin-top: 3vh;">Visibility</div>
      <div class="radio-group">
        <label class="text-margin">
          <input type="radio" v-model="visibility" value="PUBLIC"/>
          <span class="options">
            <span class="text-body">Public</span>
            <span class="text-hint descriptions left-distance">
              This model can be searched and downloaded by others, but only modifiable to you.
            </span>
          </span>
        </label>
        <label class="text-margin">
          <input type="radio" v-model="visibility" value="PRIVATE" />
          <span class="options">
            <span>Private</span>
            <span class="text-hint descriptions left-distance">
              This model is only visible to you.
            </span>
          </span>
        </label>
      </div>
<!--      <div class="text-hint">Import From Huggingface(Optional)</div>-->

      <TextButton :action="createModel" type="primary" text="create" class="text-margin" />
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import TextButton from "@/components/Button.vue";
import { mapState } from "vuex";
import service from "@/utils/index";

export default {
  components: {TextButton, FooterBar, HeaderBar},
  computed: {
    ...mapState(['userId'])
  },
  mounted() {
    if (this.$store.state.userId === -1) {
      this.$router.push('/');
      return;
    }
    service.post("/usr/getInfo", null, {
      params: {
        uid: this.userId,
        uname: ""
      }
    }).then(res => {
      this.uname = res.data.name;
    })
  },
  data() {
    return {
      mname: "",
      visibility: "PUBLIC",
      hint: "",
      showHint: false,
      uname: "",
    }
  },
  methods: {
    createModel(){
      if (this.mname === "" || this.mname.includes('/')) {
        this.showHint = true;
        this.hint = "Invalid model name."
        return;
      }
      service.post("/model/new", {
        name: this.mname,
        visibility: this.visibility,
        uid: this.userId,
      }).then(res => {
        if(!res.data) {
          this.hint = `Model named ${this.mname} already exists. Please change another name.`;
          this.showHint = true;
          return;
        }
        this.$router.push(`/models/detail/${this.uname}/${this.mname}`);
      })
    },
    hideHint(){
      if (this.showHint) {
        this.showHint = false;
      }
    }
  }
}
</script>

<style>
.center-container {
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 8px 0;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  accent-color: var(--primary-color);
}

.options {
  display: flex;
  align-items: baseline;
}

.descriptions {
  color: var(--grey4);
}

.left-distance {
  margin-left: 1em;
}
</style>