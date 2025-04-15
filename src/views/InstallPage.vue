<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="text-container" style="width: 40vw;">
        <div class="text-title text-bold">Installation & Simple Tutorial</div>

        <div class="text-subtitle text-bold">Installation</div>
        <div class="text-body text-margin" style="text-align: left;">
          Before installation, please confirm that your computer has installed
          <span class="inline-code">python> 3.7</span>.
          Then simply type in the command below to install PowerInfer server.
        </div>
        <CodeBlock text="pip install powerinfer-server" />
        <div class="text-body">
          During installation, you can select engine which match your hardware settings.
          You can also install different backend engines later using command
          <span class="inline-code">powerinfer install</span>.
          After installation finished, check the version of powerinfer-server:
        </div>
        <CodeBlock text="powerinfer --version" />
        <div class="text-body">If you see anything like this, you have successfully installed PowerInfer server!</div>
        <CodeBlock :text="multiline" :copy="false"/>

        <div class="text-subtitle text-bold">Running a Model</div>
        <div class="text-body text-margin">
          After installation, you can simply run the following command to start a model service.
        </div>
        <CodeBlock text="powerinfer run powerinfer/ReluLlama:7b" />
        <div class="text-body text-margin">This will download the model and start the interface.</div>

        <div class="text-subtitle text-bold">Changing Running Config</div>

        <div class="text-subtitle text-bold">Managing Local Models</div>

        <div class="text-subtitle text-bold">Uploading a Model</div>
        <div class="text-body text-margin">
          The model directory you uploaded must satisfy the following demands:
          <ul style="gap: 1vh; display: flex; flex-direction: column;">
            <li>Model is not in the hidden dir or named like hidden file</li>
            <li>Contains only one model</li>
            <li>Must have a <span class="inline-code">config.json</span> file</li>
            <li>(Optional) Readme file</li>
          </ul>
        </div>

        <div class="text-subtitle text-bold">Using local engines</div>

      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from '@/components/Header.vue';
import FooterBar from "@/components/Footer.vue";
import CodeBlock from "@/components/CodeBlock.vue";
export default{
  name: 'InstallPage',
  components: {CodeBlock, FooterBar, HeaderBar },
  data(){
    return {
      multiline: "(myenv) powerinfer@LAPTOP-37HM34PQ: ~/powerinfer$ pwi –version\nPowerInfer server version is 1.0.7"
    }
  }
}
</script>

<style>
.inline-code {
  background-color: color-mix(in srgb, var(--grey4) 13%, transparent);
  padding: .5em 1em .5em 1em;
  border-radius: 7px;
  line-height: 3em;
  font-family: monospace;
  font-size: 0.5em;
}
</style>