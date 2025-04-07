<template>
  <select v-model="selectedValue" class="select-box"
          :style="{borderColor: border || '#ccc', color: border || '#000' }">
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
    },
    border: String,
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
  border: 1px solid;
  font-size: 1em;
  display: flex;
  margin-left: .5vw;
}
</style>
