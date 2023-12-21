<script setup lang="ts">
import { useSearchStore } from "~/stores/search";

// store
const store = useSearchStore();

const { results, error, loading, type, page, query } = storeToRefs(store);

/** Perform new search on:
 * - search type change
 * - current page change
 */
watch(
  () => type.value,
  () => {
    store.resetSearch();
    store.search();
  }
);
watch(
  () => page.value,
  () => store.search()
);

/** reset search if query is empty */
watch(
  () => query.value,
  () => {
    if (!query.value) {
      store.resetSearch();
    }
  }
);
</script>

<template>
  <NuxtLayout name="search">
    <SearchForm @submit="store.search" />
    <UITheMessage v-if="error" :message="error.message || ''" type="error" />
    <UITheSpinner v-if="loading" />
    <TilesGridPaginated v-if="results" :tiles="results.results" />
    <UITheMessage
      v-if="results && results.results.length === 0"
      :message="`no results for '${query}' found`"
      type="info"
    />
  </NuxtLayout>
</template>
