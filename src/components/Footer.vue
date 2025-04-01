<template>
    <div class="footer">
      <div class="info">© 2025 PowerInfer</div>
      <div class="info">
        Contact Us: &nbsp;
        <a href="https://github.com/SJTU-IPADS/PowerInfer" target="_blank">Github</a>&nbsp;
        <a href="" target="_blank">Twitter</a>&nbsp;
        <a href="" target="_blank">Reddit</a>&nbsp;     
        <a href="" target="_blank">Email</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FooterBar',
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
