<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container" style="background-color: var(--white)">
      <div v-if="status === 200"
           style="width: 100%; display: flex;margin-top: 8vh; padding-left: 5vw; padding-right: 5vw;">
        <div class="text-margin"
             v-if="(model.types === null || model.types.length === 0) && this.userId !== model.uid">
          <span class="text-bold text-subtitle">No model has been uploaded yet.</span>
          <span class="link text-hint" style="margin-left: 5px;" @click="goBack">
            GO BACK
          </span>
        </div>
        <ModelUploadPanel :mname="model.name"
                          :visibility="model.visibility"
                          v-else-if="model.types === null || model.types.length === 0" />
        <div v-else style="width: 100%; flex-direction: row; display: flex;">
          <div class="base-panel left-panel">
            <div style="display: flex;" class="dark-color">
              <div class="text-hint text-bold">{{model.visibility}}</div>
              <font-awesome-icon :icon="['fas', 'repeat']"
                                 style="margin-left: .5vw;"
                                 class="hover-icon" title="Switch the visibility of this model."
                                 v-if="authored" @click="switchVisibility"/>
            </div>
            <div class="text-subtitle text-bold text-margin">
              <span>{{model.uname}}</span>
              <span>/</span>
              <span>{{model.name}}</span>
            </div>

            <div class="info-line">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span class="text-hint left-distance-in-group">{{model.numDown}} downloads</span>
              <font-awesome-icon :icon="['far', 'clock']" class="left-distance" />
              <span class="text-hint left-distance-in-group">last updated at {{model.date}}</span>
            </div>

            <div class="type-line text-margin">
              <SelectBox :options="model.types.map(t => ({
                value: t,
                label: t,
              }))" v-model="curType" border="#52738C" style="width: 70%;" :default-value="curType"/>
              <div class="text-body version-info">{{type.version.slice(0,8)}}</div>
            </div>

            <div class="file-info">
              <div class="title-line">
                <div class="text-body" style="margin-left: auto;">{{autoFormatBytes(type.size)}}</div>
              </div>
              <div class="line">
                <div class="text-body">activation</div>
                <div class="size">{{autoFormatBytes(type.size_info.activation) ?? ""}}</div>
              </div>
              <div class="line">
                <div class="text-body">model</div>
                <div class="size">{{autoFormatBytes(type.size_info.model) ?? ""}}</div>
              </div>
              <div class="line hover-icon" @click="showConfig">
                <div class="text-body">config.json</div>
                <div class="size">{{autoFormatBytes(type.size_info.config) ?? ""}}</div>
              </div>
              <div class="line hover-icon" style="border: none;" @click="showReadme"
                   v-if="this.type.size_info.readme != null && this.type.size_info.readme > 0">
                <div class="text-body">README</div>
                <div class="size">{{autoFormatBytes(type.size_info.readme) ?? ""}}</div>
              </div>
            </div>

            <div class="icon-button">
              <div class="icons">
                <font-awesome-icon :icon="nameIsCopied ? ['fas', 'check'] : ['fas', 'copy']"
                                   size="xl" title="copy model name" @click="copyName" class="hover-icon"/>
                <font-awesome-icon :icon="downloadIsCopied ? ['fas', 'check'] : ['fas', 'download']"
                                   size="xl" title="copy download command" class="hover-icon" @click="copyCommand"/>
                <font-awesome-icon :icon="['far', 'trash-can']" size="xl" class="hover-icon"
                                   title="delete current type/size" @click="deleteType" v-if="authored"/>
              </div>
              <TextButton :action="deleteModel" type="primary" text="Delete All" v-if="authored" />
            </div>
          </div>

          <div class="base-panel right-panel">
            <div class="text-subtitle text-bold">{{ display.title }}</div>
            <div v-if="display.title === 'Readme'" v-html="markdownToHtml(display.description)"></div>
            <CodeBlock v-else :text="display.description" :copy="false" />
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
import {autoFormatBytes, markdownToHtml, parseJson} from "@/utils/parser";
import CodeBlock from "@/components/CodeBlock.vue";

export default{
  name: "ModelDetailPage",
  components: {CodeBlock, SelectBox, TextButton, ModelUploadPanel, FooterBar, HeaderBar},
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
        uname: ""
      },
      curType: "",
      authored: false,
      nameIsCopied: false,
      downloadIsCopied: false,
      official_name: `${this.$route.params.uname}/${this.$route.params.mname}`,
      type: {
        size: 0,
        size_info: {
          activation: 0,
          model: 0,
          config: 0,
          readme: 0,
        },
        version: ""
      },
      display: {
        title: "Readme",
        description: "This model has no readme yet.",
      }
    }
  },
  watch: {
    curType(newVal) {
      if (newVal) {
        this.getTypeDetail();
      }
    }
  },
  methods: {
    markdownToHtml,
    autoFormatBytes,
    goBack(){
      this.$router.go(-1);
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.$router.replace('/models');
        }
      }, 1000);
    },
    showConfig(){
      this.display.title = "config.json";
      service.post("/type/get/file", null, {
        params: {
          path: this.type.dir_info["config.json"],
        }
      }).then(res => {
        this.display.description = res.data;
      })
    },
    showReadme(){
      this.display.title = "Readme";
      if(this.type.size_info.readme == null || this.type.size_info.readme === 0){
        this.display.description = "No readme yet.";
      }
      if(this.type.size_info.readme >= 50 * 1024 * 1024){
        this.display.description = "Readme file is too large to display. Clone the model locally to check the file. "
        return;
      }
      service.post("/type/get/file", null, {
        params: {
          path: this.type.dir_info["README.md"],
        }
      }).then(res => {
        this.display.description = res.data;
      })
    },
    switchVisibility(){
      service.post("/model/switch", null, {
        params: {
          mid: this.type.mid
        }
      }).then(() => {
        this.$router.go(0);
      })
    },
    deleteModel(){
      if(window.confirm("Are you sure to delete this model?")){
        service.post("/model/remove", null, {
          params: {
            mid: this.type.mid
          }
        }).then(() => {
          this.$router.go(-1);
        })
      }
    },
    deleteType(){
      if(window.confirm("Are you sure to delete this type/size?")){
        service.post("/type/remove", {
          ...this.type,
        }).then(() => {
          this.$router.go(0);
        })
      }
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
    },
    getTypeDetail(){
      service.post("/type/single/get", {
        mname: this.$route.params.mname,
        uname: this.$route.params.uname,
        tname: this.curType,
      }, {
        params: {
          "uid": this.userId,
        }
      }).then(type => {
        console.log(type.data);
        let result = type.data;
        if (result.state !== "SUCCESS") {
          if(result.state === "MODEL_NOT_FOUND" || result.state === "TYPE_NOT_FOUND") {
            this.warnings.title = "404 Not Found";
            this.warnings.description = "find";
            this.status = 404;
          }else if (result.state === "MODEL_UNACCESSIBLE") {
            this.warnings.title = "403 Unauthorized";
            this.warnings.description = "access";
            this.status = 403;
          }
          this.startCountdown();
        } else {
          this.status = 200;
          this.type = result.model;
          this.type.size_info = parseJson(result.model.size_info);
          this.type.dir_info = parseJson(result.model.dir_info);
          this.showReadme();
        }
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
      console.log(this.curType);
      if(this.curType !== null && this.curType.length > 0) {
        this.getTypeDetail();
      }
      this.model.uname = this.$route.params.uname;
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
      this.timer = null;
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
  margin: 0 auto;
}
.left-panel {
  width: 27vw;
}
.right-panel {
  width: 37vw;
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
  margin-top: 2vh;
}
.type-line {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.version-info {
  color: var(--grey4);
}

.file-info {
  border-radius: 10px;
  border: 1px solid var(--grey3);
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2vh;
  align-items: flex-start;
}
.line, .title-line {
  display: flex;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--grey3);
  padding: .5em;
}
.title-line {
  background-color: color-mix(in srgb, var(--grey1) 80%, transparent);
}
.size {
  color: var(--grey3);
}
.link {
  color: var(--secondary-color);
  text-decoration: underline;
}
.link:hover {
  cursor: pointer;
}
</style>