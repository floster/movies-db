<script setup lang="ts">
import type { TRawMovie, TRawSearchResponse } from "~/types/tmdb-raw.types";
import { EAvailableSearchTypes } from "~/types/tmdb.types";
import type { FetchError } from "ofetch";

interface ISearchState {
  query: string;
  searchType: EAvailableSearchTypes;
  currentPage: number;
  response: TRawSearchResponse<TRawMovie> | null;
  error: FetchError | null;
  pending: boolean;
}

const state = reactive<ISearchState>({
  query: "",
  searchType: EAvailableSearchTypes.Movie,
  currentPage: 1,
  response: null,
  error: null,
  pending: false,
});

const noResults = computed(
  () => !state.pending && state.response?.results.length === 0
);

const handleSearchSubmit = async () => {
  const { data, error, pending } = await useFetch(
    `/api/search/${state.searchType}`,
    {
      params: {
        query: state.query,
        page: state.currentPage,
      },
    }
  );

  state.error = error.value;
  state.pending = pending.value;

  state.response = data.value ?? null;
};

const handleClearSearchQuery = () => {
  state.query = "";
  state.currentPage = 1;
  state.response = null;
  state.error = null;
};
</script>

<template>
  <SearchForm
    v-model="state.query"
    v-model:searchType="state.searchType"
    @search-submit="handleSearchSubmit"
    @clear-search-query="handleClearSearchQuery"
  />
  <pre>type: {{ state.searchType }}</pre>
  <pre>query: {{ state.query }}</pre>
  <pre
    >{{ state.currentPage }} / {{ state.response?.total_pages }}, results: {{
      state.response?.total_results
    }}</pre
  >
  <span v-if="state.pending">pending data...</span>
  <span v-if="state.error">error: {{ state.error.message }}</span>
  <span v-if="noResults"
    >No results found for
    <mark class="bg-yellow-400">{{ state.query }}</mark></span
  >
  <TilesGrid v-if="state.response?.results" :tiles="state.response?.results!" />
</template>
