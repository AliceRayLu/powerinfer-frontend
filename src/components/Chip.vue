<template>
  <div class="chip" @click="handleClick">
    <span class="chip-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "TextChip",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2em 0.8em;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: color-mix(in srgb, var(--quaternary-color) 80%, transparent);
}

/* .chip {
  background-color: var(--primary);
  color: white;
} */

.chip-text {
  font-size: 0.5em;
  font-weight: 500;
}
</style>
