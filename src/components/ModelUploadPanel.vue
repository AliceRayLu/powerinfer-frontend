<template>
  <div class="model-container">
    <div class="text-hint text-bold dark-color">{{visibility}}</div>
    <div class="text-subtitle text-bold text-margin">{{mname}}</div>

    <div class="step-group">
      <StepGroup title="Upload" description="Uploading the original model" step="1" />
      <StepGroup title="Train" description="Training model and predictors" step="2" />
      <StepGroup title="Convert" description="Convert the model into supported format" step="3" />
    </div>

    <div class="instructions">
      <div class="bottom-separator" style="flex-direction: row; align-items: baseline;">
        <div class="text-subtitle left-margin text-bold">Add PowerInfer Keys</div>
        <div class="text-hint left-margin"> view
          <text @click="toSettings" class="setting-link">settings</text>
        </div>
      </div>
      <div class="bottom-separator"
           style="flex-direction: column; align-items: flex-start;">
        <div class="text-subtitle left-margin text-bold">Upload model from local</div>
        <div class="text-hint left-margin">
          Replace local_dir_path. Change <span class="inline-code">7b</span> into any tag you'd like to add.
        </div>
        <CodeBlock :text="upload_cmd" class="left-margin"/>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%">
        <div class="text-subtitle left-margin text-bold">Wait for the training process to end</div>
        <div class="text-body left-margin">
          You can query the state using command:
        </div>
        <CodeBlock :text="query_cmd" class="left-margin" />
        <div class="text-body left-margin">
          Or cancel the uploading and training process using command:
        </div>
        <CodeBlock :text="cancel_cmd" class="left-margin"/>
        <div class="text-body left-margin">
          If training finished, you can refresh this page to check or run the model using command:
        </div>
        <CodeBlock :text="run_cmd" class="left-margin" />
        <div class="text-body left-margin">
          This will automatically download the model and start the inference serving.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StepGroup from "@/components/Step.vue";
import CodeBlock from "@/components/CodeBlock.vue";

export default {
  name: 'ModelUploadPanel',
  components: {CodeBlock, StepGroup},
  props: {
    visibility: String,
    mname: String,
  },
  computed: {
    upload_cmd() {
      return `powerinfer upload ${this.mname}:7b -d [local_dir_path]`;
    },
    query_cmd() {
      return `powerinfer upload ${this.mname}:7b -s`;
    },
    cancel_cmd(){
      return `powerinfer upload ${this.mname}:7b -c`;
    },
    run_cmd(){
      return `powerinfer run ${this.mname}:7b`;
    }
  },
  methods: {
    toSettings() {
      this.$router.push({
        path: '/settings'
      })
    }
  }
}
</script>

<style>
.model-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
.step-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.instructions {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 5vh auto;
  border: 1px solid var(--grey0);
  border-radius: 10px;
  padding: .5em;
  align-items: flex-start;
}
.bottom-separator {
  padding-bottom: .5em;
  border-bottom: 1px solid var(--grey0);
  display: flex;
  width: 100%;
  margin-bottom: 1vh;
}
.left-margin {
  margin-left: 1vh;
}
.setting-link {
  color: var(--secondary-color);
  text-decoration: underline;
}
.setting-link:hover {
  cursor: pointer;
}
</style>