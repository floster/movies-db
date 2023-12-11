<template>
  <article class="tile">
    <NuxtPicture
      densities="1x, 2x"
      placeholder
      loading="lazy"
      fit="cover"
      :alt="movie.title"
      :src="`${tmdbImagesBaseUrl}/${EPosterSizes.w780}${movie.poster_path}`"
      class="the-tile__picture aspect-square"
    />
    <header class="flex flex-col gap-4 px-4">
      <p class="text-sky-600 dark:text-sky-500 font-serif text-lg">
        {{ new Date(movie.release_date).getFullYear() }}
      </p>
      <h2 class="text-xl">{{ movie.title }}</h2>
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
