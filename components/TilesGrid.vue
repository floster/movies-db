<template>
  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 lg:gap-6"
  >
    <TheTile v-for="tile in tiles" :key="tile.id" :movie="tile" />
  </div>
</template>

<script setup lang="ts">
import type { TRawMovie } from "~/types/tmdb-raw.types";

const props = defineProps({
  tiles: {
    type: Array as PropType<TRawMovie[]>,
    required: true,
  },
});
</script>
