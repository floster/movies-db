<template>
  <Suspense>
    <main-view></main-view>
  </Suspense>
</template>

<script lang="ts">
import MainView from "./js/views/MainView.vue";

export default {
  components: {
    MainView,
  },
};
</script>
