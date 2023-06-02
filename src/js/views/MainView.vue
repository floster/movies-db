<template>
  <app-page extraClass="m-main_view">
    <app-section extraClass="m-top_rated" title="Top Rated" pagination>
      <app-list :data="topRated"></app-list>
    </app-section>
    ><app-section extraClass="m-popular" title="Random Movie">
      <movie-tile :movie="movie"></movie-tile>
    </app-section>
  </app-page>
</template>

<script lang="ts">
import tmdb from '../tmdb';

import { ref } from 'vue';
import AppList from '../components/AppList.vue';
import MovieTile from '../components/MovieTile.vue';

export default {
  components: {
    AppList,
    MovieTile,
  },

  async setup() {
    const topRatedCurrentPage = ref(1);
    const topRated = await tmdb.getPopularsPage(
      topRatedCurrentPage.value,
      false
    );
    console.log(topRated);

    const movie = await tmdb.getMovie();

    return {
      topRated,
      movie,
    };
  },
};
</script>
