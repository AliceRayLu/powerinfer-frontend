<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div v-if="status === 200" style="width: 100%; display: flex;">
        <ModelUploadPanel :mname="model.name" :visibility="model.visibility" v-if="model.types === null || model.types.length === 0" />
        <div v-else style="width: 100%; flex-direction: row; display: flex;">
          <div class="base-panel left-panel">
            <div style="display: flex;" class="dark-color">
              <div class="text-hint text-bold">{{model.visibility}}</div>
              <font-awesome-icon :icon="['fas', 'repeat']" v-if="edit"
                                 style="margin-left: .5vw;"
                                 class="hover-icon" title="Switch the visibility of this model."/>
            </div>
            <div class="text-subtitle text-bold text-margin">{{model.name}}</div>

            <div class="info-line">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span class="text-hint left-distance-in-group">{{model.numDown}} downloads</span>
              <font-awesome-icon :icon="['far', 'clock']" class="left-distance" />
              <span class="text-hint left-distance-in-group">last updated at {{model.date}}</span>
            </div>

            <div class="type-line">
              <SelectBox :options="model.types.map(type => ({
                value: type,
                label: type,
              }))" v-model="curType" />
            </div>


            <div v-if="edit" style="width: 100%;display: flex; align-items: flex-end;" class="text-margin">
              <TextButton :action="switchEdit" type="secondary" text="cancel" />
              <TextButton :action="updateModel" type="primary" text="save" />
            </div>
            <div class="icon-button text-margin" v-else>
              <div class="icons">
                <font-awesome-icon :icon="nameIsCopied ? ['fas', 'check'] : ['fas', 'copy']"
                                   size="xl" title="copy model name" @click="copyName" class="hover-icon"/>
                <font-awesome-icon :icon="downloadIsCopied ? ['fas', 'check'] : ['fas', 'download']"
                                   size="xl" title="copy download command" class="hover-icon" @click="copyCommand"/>
                <div v-if="authored" style="gap: 1vw; display: flex;">
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" size="xl"
                                     @click="switchEdit" class="hover-icon" title="edit model infos"/>
                  <font-awesome-icon :icon="['far', 'trash-can']" size="xl" class="hover-icon"
                                     title="delete current type/size" @click="deleteType"/>
                </div>
              </div>
              <TextButton :action="deleteModel" type="primary" text="Delete All" v-if="authored" />
            </div>
          </div>

          <div class="base-panel right-panel">
            <div class="text-hint text-bold">Readme</div>
          </div>
        </div>
      </div>

      <div v-else class="warnings">
        <div class="text-title text-bold">{{warnings.title}}</div>
        <div class="text-subtitle text-margin">Unable to {{warnings.description}} model. Go back to models page in {{countdown}}s...</div>
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
import ModelUploadPanel from "@/components/ModelUploadPanel.vue";
import TextButton from "@/components/Button.vue";
import {formatDate} from "@/utils/time";
import SelectBox from "@/components/SelectBox.vue";

export default{
  name: "ModelDetailPage",
  components: {SelectBox, TextButton, ModelUploadPanel, FooterBar, HeaderBar},
  computed: {
    ...mapState(['userId'])
  },
  data(){
    return{
      status: 200,
      warnings :{
        title: "",
        description: "",
      },
      countdown: 5,
      timer: null,
      model: {
        name: "",
        date: null,
        numDown: 0,
        visibility: "",
        types: [],
      },
      curType: "",
      edit: false,
      authored: false,
      nameIsCopied: false,
      downloadIsCopied: false,
      official_name: `${this.$route.params.uname}/${this.$route.params.mname}`,
    }
  },
  methods: {
    switchEdit(){
      this.edit = !this.edit;
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.$router.push('/models');
        }
      }, 1000);
    },
    switchVisibility(){

    },
    updateModel(){

    },
    deleteModel(){

    },
    deleteType(){

    },
    copyName(){
      navigator.clipboard.writeText(this.official_name)
          .then(() => {
            this.nameIsCopied = true;
            setTimeout(() => {
              this.nameIsCopied = false;
            }, 1000);
          });
    },
    copyCommand() {
      navigator.clipboard.writeText(`powerinfer run ${this.official_name}`)
          .then(() => {
            this.downloadIsCopied = true;
            setTimeout(() => {
              this.downloadIsCopied = false;
            }, 1000);
          })
    }
  },
  mounted() {
    service.post("/model/detail", null, {
      params: {
        mname: this.$route.params.mname,
        uname: this.$route.params.uname,
        uid: this.userId,
      }
    }).then(res => {
      this.status = res.status;
      console.log(res.data);
      this.model = {
        ...this.model,
        ...res.data
      };
      if (res.data.types != null && res.data.types.length > 0) {
        this.model.types = res.data.types.split(",");
        this.curType = this.model.types[0];
      }else {
        this.model.types = [];
      }
      const type = this.$route.query.type;
      if (type != null) {
        this.curType = type;
      }
      if (res.data.uid === this.userId) {
        this.authored = true;
      }
      this.model.date = formatDate(res.data.date);
      console.log(this.model);
      // if(this.curType !== null && this.curType.length > 0) {
      //   service.post()
      // }
    }).catch(err => {
      if (err.response) {
        this.status = err.response.status;
        if (err.response.status === 404) {
          this.warnings.title = "404 Not Found";
          this.warnings.description = "find";
        } else if (err.response.status === 403) {
          this.warnings.title = "403 Unauthorized";
          this.warnings.description = "access";
        }
        this.startCountdown();
      }
    })
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style>
.warnings {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20vh auto;
}
.base-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 70vh;
  margin: 10vh auto;
}
.left-panel {
  width: 30vw;
  padding-right: 1vw;
}
.right-panel {
  width: 40vw;
}
.dark-color {
  color: var(--secondary-color);
}
.info-line {
  display: flex;
  color: var(--grey3);
  gap: .5vw;
}
.icons {
  display: flex;
  color: var(--secondary-color);
  gap:1vw;
}
.icon-button{
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.hover-icon:hover {
  cursor: pointer;
}
</style>