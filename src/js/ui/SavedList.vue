<template>
  <app-section-header>
    <app-pagination
      :page="currentPage"
      :max="totalPages"
      @page-changed="onPageChange"
    ></app-pagination>
  </app-section-header>
  <ul class="app-list">
    <li v-for="movie in movies" :key="movie.id" class="app-list__item">
      <movie-row :movie="movie"></movie-row>
    </li>
  </ul>
</template>

<script lang="ts">
import { store } from '../store';
import tmdb from '../tmdb';
import { Movie } from '../types';

import { ref, watch } from 'vue';

import MovieRow from '../components/movie/MovieRow.vue';
import AppPagination from '../components/AppPagination.vue';

export default {
  components: {
    MovieRow,
    AppPagination,
  },

  async setup() {
    const currentPage = ref(1);
    const totalPages = ref(1);

    const saved = store.movies;
    const movies = ref([] as Movie[]);

    function renderList() {
      movies.value = [];
      saved.forEach(async id => {
        const savedData = await tmdb.getMovie(id);
        movies.value.push(savedData);
        console.log(movies.value);
      });
    }

    function onPageChange(newPage: number) {
      currentPage.value = newPage;
    }

    watch(saved, () => {
      console.log(saved);
      renderList();
    });

    renderList();

    return {
      currentPage,
      totalPages,
      onPageChange,
      movies,
    };
  },
};
</script>
