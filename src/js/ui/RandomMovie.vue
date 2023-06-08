<template>
  <header class="random-movie__header flex items-center mb-8 mt-4">
    <h2 class="mr-auto text-xl text-sky-800">Random movie</h2>
    <button class="btn btn-square btn-sm" @click="refreshMovie">
      <span v-if="isLoading" class="loading loading-spinner"></span>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        baseProfile="tiny"
        viewBox="0 0 32 32"
      >
        <path
          d="M24 13V7.369L21.899 9.47a8.454 8.454 0 0 0-6.005-2.495 8.5 8.5 0 0 0 0 17 8.49 8.49 0 0 0 7.375-4.286l-1.737-.993a6.5 6.5 0 0 1-5.638 3.278 6.508 6.508 0 0 1-6.5-6.5c0-3.584 2.916-6.5 6.5-6.5 1.792 0 3.414.732 4.59 1.91L18.369 13H24z"
        />
      </svg>
    </button>
  </header>
  <app-loader v-if="isLoading"></app-loader>
  <movie-tile v-else :movie="movie"></movie-tile>
</template>

<script lang="ts">
import { ref } from 'vue';

import tmdb from '../tmdb';
import { Movie } from '../types';
import MovieTile from '../components/movie/MovieTile.vue';

export default {
  components: {
    MovieTile,
  },

  async setup() {
    let movie = ref<Movie>();
    let isLoading = ref<boolean>();

    async function refreshMovie() {
      isLoading.value = true;
      movie.value = await tmdb.getRandomMovie();
      isLoading.value = false;
    }

    await refreshMovie();

    return {
      movie,
      isLoading,
      refreshMovie,
    };
  },
};
</script>
