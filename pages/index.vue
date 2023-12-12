<template>
  <TilesGrid :tiles="movies" />
</template>

<script setup lang="ts">
import type { TRawMovie } from "~/types/tmdb-raw.types";

const { data: movie } = useFetch("/api/movie/155");

const movies = ref([] as TRawMovie[]);
if (movie.value) {
  movies.value.push(movie.value);
  movies.value.push(movie.value);
  movies.value.push(movie.value);
  movies.value.push(movie.value);
  movies.value.push(movie.value);
  movies.value.push(movie.value);
  movies.value.push(movie.value);
}

if (!movie) {
  throw createError({
    statusCode: 404,
    statusMessage: "Movie not found",
  });
}
</script>
