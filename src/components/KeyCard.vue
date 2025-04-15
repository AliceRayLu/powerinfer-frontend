<template>
  <div class="card-container">
    <div class="left">
      <div class="key-content text-body">{{ssh_key}}</div>
      <div class="time-info">
        <font-awesome-icon :icon="['far', 'clock']" />
        <text style="margin-left: 5px;" class="text-hint"> Added on: {{time}}</text>
      </div>
    </div>
    <font-awesome-icon :icon="['fas', 'trash']" class="delete-icon" @click="performAction"/>
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
    },
    type: String,
  },
  methods: {
    performAction(){
      this.$props.action(this.key_id, this.type);
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  min-width: 95%;
  max-width: 95%;
  border: 1px solid var(--grey0);
  align-items: center;
  border-radius: 10px;
  margin-top: 1vh;
  padding: 1em;
  justify-content: space-between;
}
.left{
  text-align: left;
  width: 90%;
}
.key-content {
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
}
.time-info {
  color: var(--grey4);
  padding-top: 5px;
}
</style>