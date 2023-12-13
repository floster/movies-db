<template>
  <SearchForm @search="onSearch" />
  <span v-if="noResults"
    >No results found for
    <mark class="bg-yellow-400">{{ currentQuery }}</mark></span
  >
  <TilesGrid v-else :tiles="results" />
</template>

<script setup lang="ts">
import type { TRawMovie } from "~/types/tmdb-raw.types";

const results = ref([] as TRawMovie[]);
const noResults = ref(false);
const currentQuery = ref("");

const onSearch = (data: TRawMovie[], query: string) => {
  currentQuery.value = query;

  if (data.length === 0) {
    noResults.value = true;
    return;
  }

  data.forEach((movie) => {
    results.value.push(movie);
  });
};
</script>
