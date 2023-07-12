<template>
  <header class="app-section-header">
    <slot>
      <h2 class="app-section__title">
        {{ title }}
      </h2>
    </slot>
  </header>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
  },
};
</script>
