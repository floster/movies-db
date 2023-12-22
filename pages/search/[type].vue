<script setup lang="ts">
import type { EAvailableSearchTypes } from "~/types/tmdb.types";

const store = useSearchStore();
const { type, page, query } = storeToRefs(store);

const route = useRoute();

const routeType = route.params.type as EAvailableSearchTypes;
const routeQuery = route.query.q as string;

/**
 * If route has type and query, set store values
 * and perform search
 */
if (routeType && routeQuery !== "") {
  store.type = routeType;
  store.query = routeQuery;

  store.search();
}

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
    if (query.value === "") {
      store.resetSearch();
    } else {
      store.search();
    }
  }
);
</script>

<template>
  <NuxtLayout name="search">
    <SearchResults />
  </NuxtLayout>
</template>
