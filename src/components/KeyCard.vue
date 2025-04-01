<template>
  <div class="card-container">
    <div class="left">
      <div class="key-content">{{ssh_key}}</div>
      <div class="time-info">
        <font-awesome-icon :icon="['far', 'clock']" />
        <text style="margin-left: 5px;"> Added on: {{time}}</text>
      </div>
    </div>
    <font-awesome-icon :icon="['fas', 'trash']" class="delete-icon"/>
  </div>
</template>

<script>
export default {
  name: "KeyCard",
  props: {
    ssh_key: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    key_id:{
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  width: 100%;
  border: 1px solid var(--grey0);
  align-items: center;
  border-radius: 10px;
  margin-top: 1vh;
  padding: 1em;
  justify-content: space-between;
}
.left{
  text-align: left;
}
.time-info {
  color: var(--grey4);
  padding-top: 5px;
}
</style>