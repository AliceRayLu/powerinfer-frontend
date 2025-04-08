<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container" style="align-items: center;">
      <div class="left-container">
        <div class="big-title">PowerInfer</div>
        <div class="text-title">
          Fast Large Language Model Serving with a Consumer-grade GPU & sparse models
        </div>
        <div class="icons">
          <font-awesome-icon :icon="['far', 'envelope']" size="2x" />
          <font-awesome-icon :icon="['fab', 'github']" size="2x" />
          <font-awesome-icon :icon="['fab', 'x-twitter']" size="2x" />
          <font-awesome-icon :icon="['fab', 'reddit-alien']" size="2x" />
        </div>
        <div>
          <TextButton :action="toInstall" type="primary" text="install"
                      style="display: inline-block; margin-right:2vw; width: 7vw;"/>
          <TextButton :action="toAbout" type="secondary" text="demo"
                      style="display: inline-block; margin-left:2vw; width: 7vw;"/>
        </div>
      </div>

      <div class="separator"></div>

      <div class="right-container" v-if="this.isSignIn">
        <div class="text-title text-bold">Sign In</div>
        <div class="text-hint text-margin">Email</div>
        <input v-model="email" class="text-input"/>
        <div class="text-hint text-margin">Password</div>
        <input v-model="password" class="text-input" type="password"/>
        <div class="text-hint text-margin" v-if="this.showHint" style="color: red;">{{hint}}</div>
        <TextButton :action="signIn" type="primary" text="Sign In" class="button"/>
        <div class="text-hint text-margin" style="text-align: center; width: 100%;">
          Don't have an account? <a href="#" @click.prevent="switchRight">Create</a>
        </div>
      </div>
      <div class="right-container" v-else>
        <div class="text-title text-bold">Sign Up</div>
        <div class="text-hint text-margin">Username</div>
        <input v-model="username" class="text-input"/>
        <div class="text-hint text-margin">Email</div>
        <input v-model="email" class="text-input"/>
        <div class="text-hint text-margin">Password</div>
        <input v-model="password" class="text-input" type="password"/>
        <div class="text-hint text-margin" v-if="this.showHint" style="color: red;">{{hint}}</div>
        <TextButton :action="signUp" type="primary" text="Sign Up" class="button"/>
        <div class="text-hint text-margin" style="text-align: center; width: 100%;">
          Already have an account? <a href="#" @click.prevent="switchRight">Sign In</a>
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from '@/components/Header.vue';
import TextButton from '@/components/Button.vue';
import FooterBar from "@/components/Footer.vue";
import { mapActions } from "vuex";
import service from '@/utils/index';

export default{
    name: 'HomePage',
    components: { HeaderBar, TextButton, FooterBar },
    data(){
      return {
        isSignIn: true,
        username: "",
        email: "",
        password: "",
        hint: "",
        showHint: false,
      }
    },
    methods:{
      ...mapActions(['updateUserId']),
      toInstall(){
        this.$router.push('/install');
      },
      toAbout(){
        this.$router.push('/about');
      },
      toUser(){
        this.$router.push('/usr');
      },
      signIn(){
        service.post('/usr/login', {
          email: this.email,
          passwd: this.password,
        }).then(res => {
          console.log(res.data);
          if(res.data === "wrong password" || res.data === "email not registered") {
            this.hint = res.data;
            this.showHint = true;
          }
          else {
            this.updateUserId(res.data);
            this.toUser();
          }
        })
      },
      signUp(){
        service.post('/usr/register', {
          email: this.email,
          passwd: this.password,
          name: this.username,
        }).then(res => {
          console.log(res.data);
          if(res.data.state === true) {
            this.switchRight();
          }else{
            if(!res.data.email){
              this.hint = "Email is already registered";
              this.showHint = true;
            }else{
              this.hint = "Username is already taken";
              this.showHint = true;
            }
          }
        })
      },
      switchRight(){
        this.isSignIn = !this.isSignIn;
        this.showHint = false;
        this.hint = "";
      },
    }
}
</script>

<style>
.left-container{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 40vw;
  margin: 0 auto;
}
.separator{
  width: 1px;
  background-color: var(--grey0);
}
.right-container{
  display: flex;
  flex-direction: column;
  width: 23vw;
  align-items: stretch;
  justify-content: center;
  margin: 0 auto;
}
.right-container > *:not(.button) {
  align-self: flex-start;
}
.left-container, .separator, .right-container{
  height: 70vh;
}
.big-title {
  font-size: 3em;
  color: var(--secondary-color);
  margin: 1vh;
}

.icons {
  display: flex;
  justify-content: space-between;
  width: 75%;
  margin-top: 1vh;
  margin-bottom: 2vh;
}
.button {
  margin-top: 2vh;
}
</style>