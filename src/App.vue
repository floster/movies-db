<template>
  <Suspense>
    <app-list></app-list>
  </Suspense>
</template>

<script lang="ts">
import AppList from "./js/components/AppList.vue";

export default {
  components: {
    AppList,
  },
};
</script>
