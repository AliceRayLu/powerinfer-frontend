<template>
  <div :class="['card-container', type]">
    <div class="name-row">
      <span class="text-subtitle">{{name}}</span>
    </div>
    <div class="info-row text-margin">
      <font-awesome-icon :icon="['fas', 'download']" />
      <span class="text-hint">{{num_down}} downloads</span>
      <font-awesome-icon :icon="['far', 'clock']" />
      <span class="text-hint">last updated at {{update}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModelCard",
  props: {
    name: String,
    sizes: Array(String),
    num_down: Number,
    update: String,
    type: {
      type: String,
      default: "outlined",
      validator: (value) => {
        const validOptions = ["outlined", "underlined"];
        return validOptions.includes(value)
      }
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  width: 100%;
  margin-top: 1vh;
  padding: 1em;
}
.info-row {
  color: var(--grey7);
}
.outlined {
  border: 1px solid var(--grey3);
}
</style>