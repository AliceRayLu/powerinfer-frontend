<template>
  <select v-model="selectedValue" class="select-box">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(option => option.value && option.label);
      }
    },
    defaultValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      selectedValue: this.defaultValue
    }
  }
}
</script>

<style>
.select-box {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
  width: 100%;
  display: flex;
}
</style>
