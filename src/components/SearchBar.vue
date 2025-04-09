<template>
  <input 
    v-model="search_text"
    class="text-input" 
    placeholder="Search models..." 
    @keydown.enter="action"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    action:{
      type: Function,
      required: true
    }
  },
  data() {
    return {
      search_text: '',
      timeout: null
    }
  },
  methods: {
    handleInput() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.action();
      }, 500); // 500ms 后触发搜索
    }
  }
}
</script>

<style scoped>
.text-input {
  width: 100%;
  padding-left: 40px; 
  background-image: url('@/assets/search.png');
  background-size: 20px;
  background-position: 12px center;
  background-repeat: no-repeat;
}
</style>