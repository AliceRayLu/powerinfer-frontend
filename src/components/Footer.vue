<template>
    <div class="footer">
      <div class="info">© 2025 PowerInfer</div>
      <div class="info">
        Contact Us: &nbsp;
        <a :href="github" target="_blank">Github</a>&nbsp;
        <a :href="twitter" target="_blank">Twitter</a>&nbsp;
        <a :href="reddit" target="_blank">Reddit</a>&nbsp;
        <a :href="email" target="_blank">Email</a>
      </div>
    </div>
</template>

<script>
import {EMAIL, GITHUB_URL, REDDIT_URL, TWITTER_URL} from "@/assets/constants";

export default {
  name: 'FooterBar',
  data(){
    return {
      github: GITHUB_URL,
      twitter: TWITTER_URL,
      reddit: REDDIT_URL,
      email: EMAIL,
    }
  }
}
</script>

<style>
.footer {
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.info, a {
  color: var(--grey5);
  font-size: 0.3em;
}
</style>
