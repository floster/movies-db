<template>
  <article class="movie-tile">
    <picture class="movie-tile__picture">
      <img :src="movie.poster" :alt="movie.title" />
    </picture>
    <div class="movie-tile__info">
      <h2 class="movie-tile__title">{{ movie.title }}</h2>
      <p class="movie-tile__description">{{ movie.overview }}</p>
    </div>
  </article>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Movie } from "../types";

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
  display: flex;
  align-items: center;
  gap: 2rem;

  &__picture {
    width: 8rem;
    flex-shrink: 0;
    font-size: 0;

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
