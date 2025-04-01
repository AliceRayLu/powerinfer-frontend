<template>
  <div class="container">
    <HeaderBar />
    <div class="main-container">
      <div class="text-container">
        <div class="text-title text-bold">About</div>
        <img src="../assets/demo.gif" alt="demo" style="width: 100%; margin-top: 1vh;"/>
        <div class="text-hint text-margin hint">Demo of PowerInfer running</div>
<!--        fixme-->
        <div class="text-body long-text">
          PowerInfer is implemented via using sparse models and offloading technique.
          You can read our paper at <a href="https://arxiv.org/pdf/2312.12456">https://arxiv.org/pdf/2312.12456</a>
        </div>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import HeaderBar from "@/components/Header.vue"
import FooterBar from "@/components/Footer.vue";
export default {
  name: "AboutPage",
  components: {FooterBar, HeaderBar },
}
</script>

<style>
.hint {
  color: var(--grey4);
}
.long-text {
  margin-top: 3vh;
  text-align: left;
}
</style>