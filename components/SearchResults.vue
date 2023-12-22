<script setup lang="ts">
import { useSearchStore } from "~/stores/search";

// store
const store = useSearchStore();

const { results, error, loading, query } = storeToRefs(store);
</script>

<template>
  <UITheMessage v-if="error" :message="error.message || ''" type="error" />
  <UITheSpinner v-if="loading" />
  <TilesGridPaginated v-if="results" :tiles="results.results" />
  <UITheMessage
    v-if="results && results.results.length === 0"
    :message="`no results for '${query}' found`"
    type="info"
  />
</template>
