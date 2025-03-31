<template>
  <HeaderBar />
  <div class="main-container">
    <div class="left-container">
      <div class="big-title">PowerInfer</div>
      <div class="text-body">
        Fast Large Language Model Serving with a Consumer-grade GPU & sparse models
      </div>
      <div class="icons">
        <font-awesome-icon :icon="['far', 'envelope']" />
        <font-awesome-icon :icon="['fab', 'github']" />
        <font-awesome-icon :icon="['fab', 'x-twitter']" />
        <font-awesome-icon :icon="['fab', 'reddit-alien']" />
      </div>
      <div>
        <TextButton :action="toInstall" type="primary" text="install"
                    style="display: inline-block; "/>
        <TextButton :action="toAbout" type="secondary" text="demo"
                    style="display: inline-block; "/>
      </div>
    </div>
    <div class="separator"></div>
    <div class="right-container" v-if="this.$data.isSignIn">
      <div class="text-title">Sign In</div>
      <div class="text-hint">Username or Email</div>
      <input v-model="username" class="text-input"/>
      <div class="text-hint">Password</div>
      <input v-model="password" class="text-input"/>
      <TextButton :action="signIn" type="primary" text="Sign In" />
    </div>
    <div class="right-container" v-else>
      <div class="text-title">Sign Up</div>
      <div class="text-hint">Username</div>
      <div class="text-hint">Email</div>
      <div class="text-hint">Password</div>
      <TextButton :action="signUp" type="primary" text="Sign Up" style="display: flex;"/>
    </div>
  </div>

</template>

<script>
import HeaderBar from '@/components/Header.vue';
import TextButton from '@/components/Button.vue';
export default{
    name: 'HomePage',
    components: { HeaderBar, TextButton },
    data(){
      return {
        isSignIn: true,
        username: "",
        email: "",
        password: "",
      }
    },
    methods:{
      toInstall(){
        this.$router.push('/install');
      },
      toAbout(){
        this.$router.push('/about');
      },
      signIn(){
        
      },
      signUp(){
        
      }
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
}
.separator{
  width: 2px;
  background-color: var(--grey0);
}
.right-container{
  display: flex;
  flex-direction: column;
  width: 23vw;
  align-items: flex-start;
  margin: 0 auto;
}
</style>