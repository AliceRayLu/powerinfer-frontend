<template>
  <div class="group">
    <div class="step-marker text-bold">{{step}}</div>
    <div class="step-info">
      <div class="step-name">{{ title }}</div>
      <div class="step-value">{{description}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepGroup",
  props: {
    step: Number,
    title: String,
    description: String,
  },
}
</script>

<style scoped>
.group {
  display: flex;
  align-items: center;
}
.step-marker {
  height: 2em;
  line-height: 2em;
  width: 2em;
  background-color: color-mix(in srgb, var(--primary-color) 80%, transparent);
  color: white;
  border-radius: 50%;
}
.step-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.step-name {
  color: var(--secondary-color);
  font-size: 1.2em;
}
.step-value {
  color: var(--grey4);
  margin-top: .5vh;
}
</style>