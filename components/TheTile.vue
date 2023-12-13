<template>
  <article
    class="the-tile flex flex-col gap-y-2 pb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-800 hover:shadow-md hover:shadow-sky-300 dark:hover:shadow-sky-800 overflow-hidden"
  >
    <NuxtPicture
      densities="1x, 2x"
      placeholder
      loading="lazy"
      width="230"
      height="345"
      fit="cover"
      :alt="movie.title"
      :src="`${tmdbImagesBaseUrl}/${EPosterSizes.w780}${movie.poster_path}`"
    />
    <header class="flex flex-col gap-2 px-2 lg:px-4">
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
