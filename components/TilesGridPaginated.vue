<script setup lang="ts">
import type { TAvailableSearchsFields } from "~/types/tmdb.types";

const props = defineProps<{
  tiles: TAvailableSearchsFields[];
}>();

const store = useSearchStore();

const { hasPages, getTotalPages } = storeToRefs(store);
</script>

<template>
  <section v-if="props.tiles" class="flex flex-col gap-4">
    <ThePagination v-if="hasPages" v-model="store.page" :qty="getTotalPages" />
    <TilesGrid :tiles="props.tiles" />
  </section>
</template>
