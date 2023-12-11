<template>
  <div class="grid min-h-screen gap-8">
    <UButton
      icon="i-heroicons-pencil-square"
      size="xl"
      color="sky"
      variant="soft"
      label="get movie"
      :trailing="false"
    />

    <pre>{{ data }}</pre>
  </div>
</template>

<script setup lang="ts">
const { data } = useFetch("/api/movie/155");
console.log("data", data);
</script>
