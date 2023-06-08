<template>
  <div
    class="movie-tile card card-compact w-96 bg-base-100 shadow-xl overflow-hidden"
  >
    <movie-poster
      :src="movie.poster"
      :alt="movie.title"
      extraClass="movie-tile__poster"
    ></movie-poster>
    <div class="movie-tile__body card-body">
      <h2 class="movie-tile__title card-title">{{ movie.title }}</h2>
      <p class="movie-tile__tagline">{{ movie.tagline }}</p>
      <div class="card-actions justify-end">
        <!-- <button class="btn btn-primary">Buy Now</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Movie } from '../../types';

import MoviePoster from './MoviePoster.vue';

export default {
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },

  components: {
    MoviePoster,
  },
};
</script>

<style lang="scss">
.movie-tile {
  &__tagline {
    font-style: italic;

    &::before,
    &::after {
      content: '"';
    }
  }
}
</style>
