<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="text-container" style="width: 35vw;">
        <div class="text-title text-bold">Settings</div>

        <div class="text-subtitle text-bold">Profile</div>
        <div class="text-hint text-margin">Username</div>
        <input class="text-input" v-model="username"/>
        <div class="text-hint text-margin">Email</div>
        <input class="text-input" v-model="email"/>
        <div class="text-hint text-margin">Bio</div>
        <input class="text-input" v-model="bio"/>
        <div class="text-hint text-margin" v-if="this.showHint" style="color: red;">{{hint}}</div>
        <TextButton :action="updateProfile" type="primary" text="Update" class="text-margin"/>

        <div class="text-subtitle text-bold margin">Password</div>
        <div class="text-hint text-margin">Old Password</div>
        <input class="text-input" v-model="password" type="password"/>
        <div class="text-hint text-margin">New Password</div>
        <input class="text-input" v-model="new_password" type="password"/>
        <div class="text-hint text-margin">Confirm Password</div>
        <input class="text-input" v-model="check_password" type="password"/>
        <div class="text-hint text-margin" v-if="this.showHint" style="color: red;">{{hint}}</div>
        <TextButton :action="updatePassword" type="primary" text="Update" class="text-margin"/>

        <div class="text-subtitle text-bold margin">PowerInfer Keys</div>
        <div class="text-body text-margin" style="text-align: left;">
          You must add keys to upload your own model. You can find the public key via the following command:
        </div>
        <div class="command">
          <CodeBlock :text="commands[os]" class="code-left"/>
          <SelectBox
              v-model="os"
              :options="[
                { value: 'Windows', label: 'Windows' },
                { value: 'MacOS', label: 'MacOS' },
                { value: 'Linux', label: 'Linux' }
              ]"
              defaultValue="Windows"
              class="select-box"
          />
        </div>
        <div class="text-body text-margin">Existing keys: </div>

        <div class="text-body text-margin">Add a new key:</div>
        <input class="text-input" v-model="ssh_key" />
        <TextButton :action="addSSHKey" type="primary" text="Add" />

      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import {defineComponent} from "vue";
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import TextButton from "@/components/Button.vue";
import SelectBox from "@/components/SelectBox.vue";
import CodeBlock from "@/components/CodeBlock.vue";

export default defineComponent({
  name: "SettingsPage",
  components: {CodeBlock, SelectBox, TextButton, FooterBar, HeaderBar},
  data(){
    return {
      username:"",
      password:"",
      email:"",
      bio: "",
      new_password:"",
      check_password:"",
      showHint: false,
      hint:"",
      os: "Linux",
      commands: {
        "Windows": "type C:\\Users\\<username>\\.powerinfer\\id_rsa.pub | clip",
        "MacOS": "cat ~/.powerinfer/id_rsa.pub | pbcopy",
        "Linux": "cat ~/.powerinfer/id_rsa.pub | xclip -selection clipboard"
      },
      ssh_key:"",
    }
  },
  mounted() {
    if (this.$store.state.userId === -1) {
      this.$router.push('/');
      return;
    }
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) {
      this.os = 'Windows';
    } else if (platform.includes('mac')) {
      this.os = 'MacOS';
    } else if (platform.includes('linux')) {
      this.os = 'Linux';
    }
  },
  watch: {
    os(newVal) {
      console.log('OS changed:', newVal);
    }
  },
  methods: {
    updateProfile(){

    },
    updatePassword(){},
    addSSHKey(){}
  }
})
</script>

<style>
.margin {
  margin-top: 2vh;
}
.command {
  display: flex;
  width: 100%;
  align-items: center;
}
.code-left {
  flex: 1;
}
.select-box {
  width: 18%;
  margin-left: .5vw;
}
</style>