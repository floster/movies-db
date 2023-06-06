<template>
  <app-page extraClass="m-main_view">
    <app-section
      extraClass="m-top_rated"
      title="Top Rated"
      pagination
      :paginationPage="topRatedCurrentPage"
      @pageIncrease="pageIncrease('topRated')"
      @pageDecrease="pageDecrease('topRated')"
    >
      <app-list :data="topRated"></app-list>
    </app-section>
    <app-section
      extraClass="m-popular"
      title="Currently Popular"
      pagination
      :paginationPage="popularCurrentPage"
      @pageIncrease="pageIncrease('popular')"
      @pageDecrease="pageDecrease('popular')"
    >
      <app-list :data="popular"></app-list>
    </app-section>
    <app-section extraClass="m-popular" title="Random Movie">
      <movie-tile :movie="movie"></movie-tile>
    </app-section>
  </app-page>
</template>

<script lang="ts">
import tmdb from '../tmdb';
import { Movie } from '../types';

import { ref, watch } from 'vue';
import AppList from '../components/AppList.vue';
import MovieTile from '../components/MovieTile.vue';

export default {
  components: {
    AppList,
    MovieTile,
  },

  async setup() {
    const topRatedCurrentPage = ref(1);
    const topRated = ref([] as Movie[]);
    topRated.value = await tmdb.getPopularsPage(
      topRatedCurrentPage.value,
      true
    );
    watch(topRatedCurrentPage, async newPage => {
      topRated.value = await tmdb.getPopularsPage(newPage, true);
    });

    const popularCurrentPage = ref(1);
    const popular = ref([] as Movie[]);
    popular.value = await tmdb.getPopularsPage(popularCurrentPage.value, false);
    watch(popularCurrentPage, async newPage => {
      popular.value = await tmdb.getPopularsPage(newPage, false);
    });

    const movie = await tmdb.getMovie();

    function pageIncrease(type: string) {
      type === 'popular'
        ? popularCurrentPage.value++
        : topRatedCurrentPage.value++;
    }

    function pageDecrease(type: string) {
      type === 'popular'
        ? popularCurrentPage.value === 1
          ? 1
          : popularCurrentPage.value--
        : topRatedCurrentPage.value === 1
        ? 1
        : topRatedCurrentPage.value--;
    }

    return {
      topRatedCurrentPage,
      topRated,
      popularCurrentPage,
      popular,
      movie,
      pageIncrease,
      pageDecrease,
    };
  },
};
</script>
