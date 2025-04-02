<template>
  <div @click="action" :class="['basic', 'text-hint', type, capsule ? 'capsule': '']">{{ text }}</div>
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
        const validOptions = ['primary', 'secondary', 'tertiary'];
        return validOptions.includes(value)
      }
    },
    action: {
      type: Function,
      required: true
    },
    capsule: {
      type: Boolean,
      default: false
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

.basic.capsule {
  border-radius: 9999px;
}

.primary {
  background-color: color-mix(in srgb, var(--primary-color) 80%, transparent);
  color: white;
}

.secondary {
  background-color: color-mix(in srgb, var(--grey2) 20%, transparent);
}

.tertiary {
  background-color: color-mix(in srgb, var(--primary-color) 30%, transparent);
  color: var(--secondary-color);
}
</style>