<template>
  <div
    class="movie-tile card card-compact w-96 bg-base-100 shadow-xl"
    :data-position="movie.id + 1"
  >
    <figure class="movie-tile__figure">
      <img :src="movie.poster" :alt="movie.title" />
    </figure>
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
import { Movie } from '../types';

export default {
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.movie-tile {
  &::before {
    content: attr(data-position);
  }

  &__tagline {
    font-style: italic;

    &::before,
    &::after {
      content: '"';
    }
  }
}
</style>
