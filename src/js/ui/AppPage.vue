<template>
  <div class="app-page" :class="extraClass">
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
