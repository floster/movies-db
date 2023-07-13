<template>
  <h1>{{ text }}</h1>
</template>

<script lang="ts">
export default {
  setup() {
    const text = `Here I am`;

    return {
      text,
    };
  },
};
</script>
