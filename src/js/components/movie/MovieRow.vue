<template>
  <article
    class="movie-row flex items-center gap-4 border-l-4 border-slate-300 hover:border-sky-500"
  >
    <movie-poster
      :src="movie.poster"
      :alt="movie.title"
      extraClass="movie-row__poster"
    ></movie-poster>
    <div class="movie-row__info pr-4">
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
}
</style>
