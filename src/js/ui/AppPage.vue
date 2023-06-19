<template>
  <div
    class="page grid grid-cols-3 gap-12 p-4 rounded-lg bg-white shadow-lg"
    :class="extraClass"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    extraClass: String,
  },
};
</script>

<style lang="scss">
.page {
  &.m-main_view {
  }
}
</style>
