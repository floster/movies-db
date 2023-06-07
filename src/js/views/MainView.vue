<template>
  <app-page extraClass="m-main_view">
    <app-section extraClass="m-populars">
      <movie-list initialList="top_rated"></movie-list>
    </app-section>
    <app-section extraClass="m-random" title="Random Movie">
      <random-movie></random-movie>
    </app-section>
  </app-page>
</template>

<script lang="ts">
import MovieList from '../ui/MovieList.vue';
import RandomMovie from '../ui/RandomMovie.vue';

export default {
  components: {
    RandomMovie,
    MovieList,
  },
};
</script>
