<template>
  <article
    class="movie-row flex items-center gap-4 border-l-4 border-slate-300 hover:border-sky-500"
    :data-position="movie.place"
  >
    <picture class="movie-row__picture w-12">
      <img :src="movie.poster" :alt="movie.title" />
    </picture>
    <div class="movie-row__info pr-4">
      <h2 class="movie-row__title">{{ movie.title }}</h2>
      <!-- <p class="movie-row__description">{{ movie.overview }}</p> -->
    </div>
  </article>
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
    title: String,
  },
};
</script>

<style lang="scss">
.movie-row {
  &__picture {
    max-width: 8rem;
    flex-shrink: 0;
    font-size: 0;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
