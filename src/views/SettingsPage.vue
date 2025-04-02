<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="text-container" style="width: 35vw;">
        <div class="text-title text-bold">Settings</div>

        <div class="text-subtitle text-bold">Profile</div>
        <div class="text-hint text-margin">Username</div>
        <input class="text-input disabled-name" v-model="username" disabled title="Unable to change username."/>
        <div class="text-hint text-margin">Email</div>
        <input class="text-input" v-model="email"/>
        <div class="text-hint text-margin">Bio</div>
        <input class="text-input" v-model="bio"/>
        <div class="text-hint text-margin" v-if="this.showHints[0]" style="color: red;">{{hints[0]}}</div>
        <TextButton :action="updateProfile" type="primary" text="Update" class="text-margin"/>

        <div class="text-subtitle text-bold margin">Password</div>
        <div class="text-hint text-margin">Old Password</div>
        <input class="text-input" v-model="password" type="password"/>
        <div class="text-hint text-margin">New Password</div>
        <input class="text-input" v-model="new_password" type="password"/>
        <div class="text-hint text-margin">Confirm Password</div>
        <input class="text-input" v-model="check_password" type="password"/>
        <div class="text-hint text-margin" v-if="this.showHints[1]" style="color: red;">{{hints[1]}}</div>
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
          />
        </div>
        <div class="text-body text-margin">Existing keys: </div>
        <div class="key-cards" v-for="key in keys" :key="key.kid">
          <KeyCard :time="formatDate(key.date)" :ssh_key="key.content" :key_id="key.kid" :action="deleteSSHKey"/>
        </div>
        <div class="text-body text-margin">Add a new key:</div>
        <input class="text-input" v-model="ssh_key" />
        <div class="text-hint text-margin" v-if="this.showHints[2]" style="color: red;">{{hints[2]}}</div>
        <TextButton :action="addSSHKey" type="primary" text="Add" class="text-margin"/>

      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue";
import FooterBar from "@/components/Footer.vue";
import TextButton from "@/components/Button.vue";
import SelectBox from "@/components/SelectBox.vue";
import CodeBlock from "@/components/CodeBlock.vue";
import KeyCard from "@/components/KeyCard.vue";
import service from "@/utils";
import { mapState } from "vuex";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
  name: "SettingsPage",
  components: {KeyCard, CodeBlock, SelectBox, TextButton, FooterBar, HeaderBar},
  computed: {
    ...mapState(['userId'])
  },
  data(){
    return {
      username:"",
      password:"",
      email:"",
      bio: "",
      new_password:"",
      check_password:"",
      showHints: [false,false,false],
      hints: ["", "", ""],
      os: "Linux",
      commands: {
        "Windows": "type C:\\Users\\<username>\\.powerinfer\\id_rsa.pub | clip",
        "MacOS": "cat ~/.powerinfer/id_rsa.pub | pbcopy",
        "Linux": "cat ~/.powerinfer/id_rsa.pub | xclip -selection clipboard"
      },
      ssh_key:"",
      keys: [],
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
    service.post("/usr/getInfo", null, {
      params: {
        uid: this.userId
      }
    }).then(res =>{
      let user = res.data;
      this.username = user.name;
      this.email = user.email;
      this.bio = user.bio;
    })
    this.getSSHkeys();
  },
  watch: {
    os(newVal) {
      console.log('OS changed:', newVal);
    }
  },
  methods: {
    getSSHkeys(){
      service.post("/key/get/usr/ssh", null, {
        params: {
          uid: this.userId
        }
      }).then(res => {
        this.keys = res.data;
      })
    },
    updateProfile(){
      service.post("/usr/update", {
        uid: this.userId,
        email: this.email,
        bio: this.bio,
      }).then(res => {
        this.showHints[0] = true;
        if (!res.data) {
          this.hints[0] = "Email has already been registered.";
        } else {
          this.hints[0] = "Successfully updated your profile.";
        }
        setTimeout(() => {
          this.showHints[0] = false;
        }, 3000)
      })
    },
    updatePassword(){
      if(this.new_password === ""){
        this.showHints[1] = true;
        this.hints[1] = "Password can't be empty.";
        return;
      }
      if(this.new_password !== this.check_password){
        this.showHints[1] = true;
        this.hints[1] = "Passwords do not match.";
        return;
      }
      service.post("/usr/passwd/update", {
        uid: this.userId,
        old_passwd: this.password,
        new_passwd: this.new_password,
      }).then(res => {
        this.showHints[1] = true;
        if(!res.data) {
          this.hints[1] = "Old password is wrong.";
        }else {
          this.hints[1] = "Successfully changed your password.";
          this.password = "";
          this.new_password = "";
          this.check_password = "";
          setTimeout(() => {
            this.showHints[1] = false;
          }, 3000)
        }
      })
    },
    addSSHKey(){
      service.post("/key/add", {
        uid: this.userId,
        content: this.ssh_key,
        type: "ssh"
      }).then(res => {
        if(!res.data){
          this.showHints[2] = true;
          this.hints[2] = "SSH key has already been added.";
        }else {
          this.showHints[2] = false;
          this.ssh_key = "";
          this.getSSHkeys();
        }
      })
    },
    deleteSSHKey(kid){
      service.post("/key/delete", null, {
        params: {
          kid: kid
        }
      }).then(() => {
        this.getSSHkeys();
      })
    },
    formatDate(date) {
      return dayjs(date).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm');
    }
  }
}
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
.key-cards {
  display: flex;
  width: 100%;
}
.disabled-name:hover {
  cursor: not-allowed;
}
</style>