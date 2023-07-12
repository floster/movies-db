<template>
  <article class="movie-row">
    <movie-poster
      :src="movie.poster"
      :alt="movie.title"
      extraClass="movie-row__poster"
    ></movie-poster>
    <button-favorite :id="movie.id"></button-favorite>
    <div class="movie-row__info">
      <h2 class="movie-row__title">{{ movie.title }}</h2>
    </div>
  </article>
</template>

<script lang="ts">
import { PropType, ref } from 'vue';
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

  setup() {
    const isImageLoading = ref(true);

    function imageLoading() {
      isImageLoading.value = false;
    }

    return {
      isImageLoading,
      imageLoading,
    };
  },
};
</script>

<style lang="scss">
.movie-row {
  &__poster {
    width: 3rem;

    img {
      width: 100%;
      height: auto;
    }
  }

  &:hover {
    .button-favorite {
      transform: translate(0%, -50%);
    }
  }

  .button-favorite {
    position: absolute;
    top: 50%;
    right: 0.5rem;

    transform: translate(100%, -50%);
  }
}
</style>
