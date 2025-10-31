<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    :class="[
      rotate === 'left' && 'rotate-left',
      rotate === 'right' && 'rotate-right',
      rotate === 'up' && 'rotate-up',
      rotate === 'down' && 'rotate-down'
    ]"
  >
    <path
      d="M9 6L15 12L9 18"
      :stroke="color || 'black'"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    color: {
      type: String,
      required: false,
      default: '#646668'
    },
    rotate: {
      type: String,
      required: false,
      default: 'down'
    }
  }
})
</script>

<style scoped>
.rotate-down {
  transform: rotate(0deg);
}
.rotate-down {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(180deg);
}
.rotate-up {
  transform: rotate(270deg);
}
</style>
