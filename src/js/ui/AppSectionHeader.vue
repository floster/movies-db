<template>
  <header class="app-section-header flex items-center mb-4">
    <slot>
      <h2 class="app-section__title mr-auto text-xl text-sky-800">
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
