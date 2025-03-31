<template>
  <div @click="action" :class="['basic', type]">{{ text }}</div>
</template>

<script>
export default {
  name: 'TextButton',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: (value) => {
        const validOptions = ['primary', 'secondary']
        return validOptions.includes(value)
      }
    },
    action: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>
.basic {
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
}

.primary {
  background-color: color-mix(in srgb, var(--primary-color) 80%, transparent);
  color: white;
}

.secondary {
  background-color: color-mix(in srgb, var(--grey2) 20%, transparent);
}
</style>