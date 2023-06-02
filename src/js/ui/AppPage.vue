<template>
  <section
    class="page grid grid-cols-3 gap-12 p-4 mb-6 rounded-lg bg-white shadow-lg"
    :class="extraClass"
  >
    <slot></slot>
  </section>
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
