<template>
    <header>
        <nav>
            <div class="header-container">
              <div class="navbar">
                <span class="title" @click="toHome">PowerInfer</span>
                <span class="text-title nav-link-item" style="margin-left: 2vw;" @click="toInstall">
                  Install Tutorial
                </span>
                <span class="text-title nav-link-item" @click="toModels">Models</span>
                <span class="text-title nav-link-item" @click="toAbout">
                  About-Model Sparsification
                </span>
              </div>
              <div class="userbar" v-if="userId !== -1">
                <font-awesome-icon :icon="['fas', 'circle-user']" class="icon" @click="toUsr"/>
                <font-awesome-icon :icon="['fas', 'plus']" class="icon" @click="toCreate"/>
                <font-awesome-icon :icon="['fas', 'gear']" class="icon" @click="toSettings"/>
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="icon" @click="exit"/>
              </div>  
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "HeaderBar",
  computed: {
    ...mapState(['userId'])
  },
  methods:{
    ...mapActions(['updateUserId']),
    toHome(){
      this.$router.push({path: '/'});
    },
    toInstall(){
      this.$router.push({path: '/install'});
    },
    toModels(){
      this.$router.push({path: '/models'});
    },
    toAbout(){
      this.$router.push({path: '/about'});
    },
    toUsr(){
      this.$router.push({path: `/usr`});
    },
    toSettings(){
      this.$router.push({path: '/settings'});
    },
    toCreate(){
      this.$router.push({path: '/models/create'});
    },
    exit(){
      this.updateUserId(-1);
      this.$router.push({path: '/'});
    }
  }
}
</script>

<style>
header nav{
  height: 7vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  flex-direction: row;
  width: 100%;
  background-color: var(--white);
}
.header-container{
  display: flex;
  width: var(--content-width);
  margin: 0 auto;
  justify-content: space-between;
}
.navbar{
  display: flex;
  align-items: center;
}
.title {
  font-size: 2em;
  color: var(--secondary-color);
}
.nav-link-item {
  margin-left: 1vw;
  font-weight: 100;
  text-decoration: underline;
}

.title:hover, .nav-link-item:hover, .icon:hover {
  cursor: pointer;
  color: var(--primary-color);
}

.userbar {
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 1vw;
}
</style>