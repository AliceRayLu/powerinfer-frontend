<template>
  <div class="code-block">
    <text class="code-text">{{text}}</text>
    <font-awesome-icon 
      v-if="copy"
      :icon="isCopied ? ['fas', 'check'] : ['fas', 'clone']" 
      class="copy-icon" 
      @click="copyToClipboard"
    />
  </div>
</template>

<script>
export default {
  name: 'CodeBlock',
  props: {
    text: String,
    copy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isCopied: false
    }
  },
  methods: {
    copyToClipboard() {
      if (this.copy) {
        navigator.clipboard.writeText(this.text)
          .then(() => {
            this.isCopied = true;
            setTimeout(() => {
              this.isCopied = false;
            }, 1000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      }
    }
  }
}
</script>

<style>
.code-block {
  display: flex;
  justify-content: space-between;
  width: 90%;
  background-color: color-mix(in srgb, var(--grey4) 13%, transparent);
  padding: 10px;
  border-radius: 7px;
  align-items: center;
  margin: 1vh 0 1vh 0;
}
.code-text {
  line-height: 3em;
  font-family: monospace;
  font-size: 0.5em;
  text-align: left;
  white-space: pre-wrap;
}
.copy-icon {
  color: var(--grey6);
}
.copy-icon:hover {
  cursor: pointer;
}
</style>