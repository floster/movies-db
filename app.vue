<template>
  <div class="grid grid-cols-5 gap-8">
    <TheTile :movie="movie!" />
    <TheTile :movie="movie!" />
    <TheTile :movie="movie!" />
    <TheTile :movie="movie!" />
    <TheTile :movie="movie!" />
  </div>
</template>

<script setup lang="ts">
const { data: movie } = useFetch("/api/movie/155");

if (!movie) {
  throw createError({
    statusCode: 404,
    statusMessage: "Movie not found",
  });
}
</script>
