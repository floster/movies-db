<template>
  <SearchForm
    v-model="state.query"
    v-model:searchType="state.searchType"
    @search-submit="handleSearchSubmit"
    @clear-search-query="handleClearSearchQuery"
  />
  <!-- <span v-if="noResults"
    >No results found for
    <mark class="bg-yellow-400">{{ state.query }}</mark></span
  > -->
  <!-- <TilesGrid v-else :tiles="results" /> -->
  <pre>type: {{ state.searchType }}</pre>
  <pre>query: {{ state.query }}</pre>
</template>

<script setup lang="ts">
import type { TRawMovie } from "~/types/tmdb-raw.types";
import { EAvailableSearchTypes } from "~/types/tmdb.types";

const state = reactive({
  query: "",
  searchType: EAvailableSearchTypes.Movie,
  // results: [] as TRawMovie[],
});

// const noResults = computed(() => state.results.length);

const handleSearchSubmit = () => {
  console.log("search submit", state.query);
};

const handleClearSearchQuery = () => {
  console.log("clear search query");

  state.query = "";
};
</script>
