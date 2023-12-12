<template>
  <article
    class="grid gap-y-2 lg:gap-y-4 pb-6 bg-white dark:bg-slate-600 rounded-lg shadow-lg shadow-slate-300 dark:shadow-slate-900 hover:shadow-sky-300 dark:hover:shadow-sky-800 overflow-hidden"
  >
    <NuxtPicture
      densities="1x, 2x"
      placeholder
      loading="lazy"
      fit="cover"
      :alt="movie.title"
      :src="`${tmdbImagesBaseUrl}/${EPosterSizes.w780}${movie.poster_path}`"
      class="the-tile__picture aspect-square"
    />
    <header class="flex flex-col gap-2 lg:gap-4 px-2 lg:px-4">
      <p class="text-sky-600 dark:text-sky-500 font-serif text-base lg:text-lg">
        {{ new Date(movie.release_date).getFullYear() }}
      </p>
      <h2 class="text-lg lg:text-xl">{{ movie.title }}</h2>
    </header>
  </article>
</template>

<script setup lang="ts">
import type { TRawMovie } from "~/types/tmdb-raw.types";
import { EPosterSizes } from "~/types/tmdb.types";
const {
  public: { tmdbImagesBaseUrl },
} = useRuntimeConfig();

const props = defineProps({
  movie: {
    type: Object as PropType<TRawMovie>,
    required: true,
  },
});
</script>
