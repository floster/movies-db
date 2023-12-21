<script setup lang="ts">
import type { TRawSearchResponse } from "~/types/tmdb-raw.types";
import type { TAvailableSearchsFields } from "~/types/tmdb.types";
import { EAvailableSearchTypes } from "~/types/tmdb.types";
import type { FetchError } from "ofetch";

interface ISearchState {
  query: string;
  searchType: EAvailableSearchTypes;
  currentPage: number | null;
  response: TRawSearchResponse<TAvailableSearchsFields> | null;
  error: FetchError | null;
  loading: boolean;
}

const state = reactive<ISearchState>({
  query: "",
  searchType: EAvailableSearchTypes.Movie,
  currentPage: null,
  response: null,
  error: null,
  loading: false,
});

const handleSearchSubmit = async () => {
  resetSearch();
  state.loading = true;
  const { data, error } = await useFetch(`/api/search/${state.searchType}`, {
    params: {
      query: state.query,
      page: state.currentPage,
    },
  });

  state.error = error.value;
  state.response = data.value ?? null;
  state.loading = false;
};

/** Perform new search on:
 * - search type change
 * - current page change
 */
watch(
  [() => state.searchType, () => state.currentPage],
  () => {
    if (state.query) handleSearchSubmit();
  },
  { immediate: true }
);

const resetSearch = () => {
  state.currentPage = 1;
  state.response = null;
  state.error = null;
};

const resetSearchAndClearQuery = () => {
  state.query = "";
  resetSearch();
};
</script>

<template>
  <NuxtLayout name="search">
    {{ state.currentPage }}
    <SearchForm
      v-model="state.query"
      v-model:searchType="state.searchType"
      @search-submit="handleSearchSubmit"
      @clear-search-query="resetSearchAndClearQuery"
    />
    <UITheMessage
      v-if="state.error"
      :message="state.error.message || ''"
      type="error"
    />
    <UITheSpinner v-if="state.loading" />
    <TheTiles
      v-if="state.response && state.currentPage"
      :results="state.response"
    />
  </NuxtLayout>
</template>
