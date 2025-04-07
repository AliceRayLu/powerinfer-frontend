<template>
  <div :class="['card-container', type]">
    <div class="name-row">
      <span class="text-subtitle name-text" @click="jumpDetail">{{name}}</span>
      <div class="chip-container">
        <Chip :text="size" class="chips" v-for="size in sizes.slice(0,7)" :key="size" @click="jumpDetail(size)"/>
      </div>

    </div>
    <div class="info-row text-margin" @click="jumpDetail">
      <span v-if="visibility !== undefined">
        <font-awesome-icon :icon="['far', 'eye']" />
        <span class="text-hint left-distance-in-group" style="margin-right: 1.2em;">{{visibility}}</span>
      </span>
      <font-awesome-icon :icon="['fas', 'download']" />
      <span class="text-hint left-distance-in-group">{{num_down}} downloads</span>
      <font-awesome-icon :icon="['far', 'clock']" class="left-distance" />
      <span class="text-hint left-distance-in-group">last updated at {{update}}</span>
    </div>
  </div>
</template>

<script>
import Chip from "@/components/Chip.vue";

export default {
  name: "ModelCard",
  components: {Chip},
  props: {
    name: String,
    sizes: Array(String),
    num_down: Number,
    update: String,
    uname: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "outlined",
      validator: (value) => {
        const validOptions = ["outlined", "underlined"];
        return validOptions.includes(value)
      }
    },
    visibility: String,
  },
  methods: {
    jumpDetail(size){
      let pathConfig = {
        path: `/detail/${this.$props.uname}/${this.$props.name}`
      }
      if (size !== null && size !== undefined) {
        pathConfig = {
          ...pathConfig,
          query: {
            type: size
          }
        }
      }
      this.$router.push(pathConfig);
    }
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  margin-top: 1vh;
  padding: 1em;
}
.name-row {
  display: flex;
  align-items: center;
  width: 100%;
}
.info-row {
  color: var(--grey7);
}
.outlined {
  border-radius: 10px;
  border: 1px solid var(--grey3);
}
.underlined {
  border-bottom: 1px solid var(--grey3);
}
.chip-container {
  display: flex;
  flex-wrap: nowrap;
  margin-left: 12px;
  gap: 5px;
  max-width: 100%;
  overflow: hidden;
}
.chips{
  flex-shrink: 0;
}
.left-distance {
  margin-left: 1em;
}
.left-distance-in-group {
  margin-left: 0.5em;
}
.name-text:hover, .info-row:hover {
  cursor: pointer;
}
</style>