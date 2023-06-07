<template>
  <movie-tile :movie="movie"></movie-tile>
</template>

<script lang="ts">
import tmdb from '../tmdb';
import MovieTile from '../components/movie/MovieTile.vue';

export default {
  components: {
    MovieTile,
  },

  async setup() {
    const movie = await tmdb.getMovie();

    return {
      movie,
    };
  },
};
</script>
