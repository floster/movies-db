<template>
  <div class="movie-tile">
    <movie-poster
      :src="movie.poster"
      :alt="movie.title"
      extraClass="movie-tile__poster"
    ></movie-poster>
    <button-favorite :id="movie.id"></button-favorite>
    <div
      class="movie-tile__rating"
      style="--value: 0; --size: 3.5rem"
      :style="styles"
    >
      {{ rating }}
    </div>
    <div class="movie-tile__body">
      <h2 class="movie-tile__title">{{ movie.title }}</h2>
      <p class="movie-tile__tagline">{{ movie.tagline }}</p>
      <div class="card-actions"></div>
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

  setup(props) {
    const rating = parseFloat(String(props.movie.votes)).toFixed(1);
    const styles = `--value: ${+rating * 10}`;

    return {
      rating,
      styles,
    };
  },
};
</script>

<style lang="scss">
.movie-tile {
  &__rating {
    margin-top: -3rem;
    margin-left: 1rem;
  }

  &__tagline {
    &::before,
    &::after {
      content: '"';
    }

    &:empty {
      display: none;
    }
  }

  .button-favorite {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
