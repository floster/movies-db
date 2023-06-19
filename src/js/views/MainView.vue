<template>
  <app-page extraClass="m-main_view">
    <app-section extraClass="m-saved" title="Saved">
      <saved-list></saved-list>
    </app-section>
    <app-section extraClass="m-populars">
      <movie-list initialList="top_rated"></movie-list>
    </app-section>
    <app-section extraClass="m-random">
      <random-movie></random-movie>
    </app-section>
  </app-page>

  <p>{{ movies }}</p>
</template>

<script lang="ts">
import { store } from '../store';

import MovieList from '../ui/MovieList.vue';
import SavedList from '../ui/SavedList.vue';
import RandomMovie from '../ui/RandomMovie.vue';

export default {
  components: {
    MovieList,
    SavedList,
    RandomMovie,
  },

  setup() {
    const movies = store.movies;

    return {
      movies,
    };
  },
};
</script>
