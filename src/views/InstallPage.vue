<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="text-container" style="width: 40vw;">
        <div class="text-title text-bold">Installation & Simple Tutorial</div>

        <div class="text-subtitle text-bold">Installation</div>

        <div class="text-body text-margin" style="text-align: left;">
          Before installation, please confirm that your computer has installed
          <span class="inline-code">python> 3.7</span> and c language compilers and cmake <s>(temporary)</s>
          Then simply type in the command below to install PowerInfer server.
        </div>
        <CodeBlock text="pip install powerinfer-server" />
        <div class="text-body">
          <s>
            During installation, you can select engine which match your hardware settings.
            (Without c compiler installed methods. Need fix.)
          </s>
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
        <CodeBlock text="powerinfer run powerinfer/ReluLLaMa:7b" />
        <div class="text-body text-margin">This will download the model and start the interface.</div>

        <div class="text-subtitle text-bold" style="margin-top:2vh;">Using local engines</div>

        <div class="text-body text-margin">
          If a compile error occurs, you can download the source code from the
          <a href="https://github.com/SJTU-IPADS/PowerInfer" target="_blank">PowerInfer Repository</a>.
          Then compile it using the following command manually and solve the environment problems.
          We plan to release the pre-built binaries later.
        </div>
        <CodeBlock :text="compile" />
        <div class="text-body text-margin">
          After compilation, install the engine using the following command with any engine name you like.
        </div>
        <CodeBlock text="powerinfer install [engine_name] -f [/path/to/your/server.exe]" />

        <div class="text-subtitle text-bold">Changing Running Config</div>

        <div class="text-body text-margin">
          Using command <span class="inline-code">powerinfer config</span> to modify default config.
          Use <span class="inline-code">-h</span> to check all the options.
          Default config will be like the following.
        </div>
        <CodeBlock :text="config" :copy="false"/>
        <div class="text-body text-margin">
          Here are some detailed explanation about configuration parameters:
          <ul class="list">
            <li>
              <span class="inline-code">model_path</span>
              : The default directory to store downloaded models.
            </li>
            <li>
              <span class="inline-code">engine</span>
              : The engine name you want to use in the running.
              Use <span class="inline-code">powerinfer list -i</span> to see all the installed engines.
            </li>
            <li>
              <span class="inline-code">options</span>
              : Hyper parameters for model serving.
            </li>
          </ul>
        </div>

        <div class="text-subtitle text-bold">Uploading a Model</div>

        <div class="text-body text-margin">
          The model directory you uploaded must satisfy the following demands:
          <ul class="list">
            <li>
              Model is not in the hidden dir or named like hidden file.
              (File name starts with <span class="inline-code">.</span>)
            </li>
            <li>Contains only one model. (The weight can be divided into several files.)</li>
            <li>Must have a <span class="inline-code">config.json</span> file</li>
            <li>
              (Optional) <span class="inline-code">README.md</span>
              file will be recognized and displayed on the model detail page.
            </li>
          </ul>
          Then you can use the following command:
        </div>
        <CodeBlock text="powerinfer upload [model_name:type] -d [local_dir]" />
        <div class="text-body text-margin">
          to upload the local model. You can also upload from Huggingface directly with option
          <span class="inline-code">-hf</span> instead.
        </div>

        <div class="text-subtitle text-bold" style="margin-top: 2vh;">Managing Local Models</div>

        <div class="text-body text-margin">
          Use <span class="inline-code">powerinfer list</span> to check all the local models.
          If you want to remove any model, use <span class="inline-code">powerinfer remove [model_name]</span>.
        </div>

        <hr>
        <div class="text-body text-margin">
          For more information, use <span class="inline-code">powerinfer -h</span> to check all the command.
        </div>
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
      multiline: "(myenv) powerinfer@LAPTOP-37HM34PQ: ~/powerinfer$ pwi –version\nPowerInfer server version is 1.1.0",
      compile: "cmake -S . -B build -DLLAMA_CUBLAS=ON\n" +
          "cmake --build build --config Release",
      config: "DEFAULT_CONFIG = {\n" +
          "    \"model_path\": ~/.powerinfer/models,\n" +
          "    \"engine\": \"default-cuda\", \n" +
          "    \"options\": {\n" +
          "        \"n_predict\": 512,\n" +
          "        \"top_k\": 40,\n" +
          "        \"top_p\": 0.9,\n" +
          "        \"min_p\": 0.05,\n" +
          "        \"temp\": 0.7,\n" +
          "        \"stop\": [\"\\nUser: \"]\n" +
          "    },\n" +
          "    \"system-prompt\": \"Transcript of a never ending dialog, where the User interacts with an Assistant.\\nThe Assistant is helpful, kind, honest, good at writing, and never fails to answer the User's requests immediately and with precision.\\nUser: Hi, Who are you?\\n Assistant: I'm a helpful AI assistant. How can I help you today?\\n\",\n" +
          "}"
    }
  }
}
</script>

<style>
.list {
  gap: 1vh;
  display: flex;
  flex-direction: column;
}
</style>