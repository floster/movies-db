<script setup lang="ts">
import type { TRawSearchResponse } from "~/types/tmdb-raw.types";
import type { TAvailableSearchsFields } from "~/types/tmdb.types";

const props = defineProps<{
  results: TRawSearchResponse<TAvailableSearchsFields>;
}>();

const emit = defineEmits(["update:currentPage"]);

const page = ref(1);

const hasPagination = computed(() => props.results.total_pages > 1);
const hasResults = computed(() => props.results.results.length > 0);
</script>

<template>
  <section class="flex flex-col gap-4">
    <ThePagination
      v-if="hasPagination"
      v-model="page"
      :qty="results.total_pages"
    />
    <TilesGrid v-if="hasResults" :tiles="results.results" />
  </section>
</template>
