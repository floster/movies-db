<template>
  <app-section-header>
    <app-select
      :options="options"
      :defaultOption="selectedList"
      @option-changed="listChanged"
    ></app-select>
    <app-pagination
      :page="currentPage"
      :max="totalPages"
      @page-changed="onPageChange"
    ></app-pagination>
  </app-section-header>
  <ul class="app-list flex flex-col gap-1 list-none m-0 p-0">
    <li
      v-for="movie in movies"
      :key="movie.id"
      class="app-list__item border border-solid border-transparent hover:border-slate-200 hover:shadow-sm rounded-md overflow-hidden"
    >
      <movie-row :movie="movie"></movie-row>
    </li>
  </ul>
</template>

<script lang="ts">
import tmdb from '../tmdb';
import { Movie, MovieListTypes } from '../types';
import { OPTIONS_MOVIE_LIST } from '../config';

import { ref, watch } from 'vue';

import MovieRow from '../components/movie/MovieRow.vue';
import AppSelect from '../components/AppSelect.vue';
import AppPagination from '../components/AppPagination.vue';

export default {
  components: {
    MovieRow,
    AppSelect,
    AppPagination,
  },

  props: {
    initialList: {
      type: String as () => MovieListTypes,
      required: false,
      default: 'popular',
    },
  },

  async setup(props) {
    const options = OPTIONS_MOVIE_LIST;

    const currentPage = ref(1);
    const totalPages = ref(0);

    // TODO: get max pages and send it to pagination
    const selectedList = ref<MovieListTypes>(props.initialList);

    const movies = ref([] as Movie[]);
    const response = await tmdb.getMovieListPage(
      currentPage.value,
      selectedList.value
    );

    movies.value = response.movies;
    totalPages.value = response.pages;

    function listChanged(newList: MovieListTypes) {
      selectedList.value = newList;
    }
    watch(selectedList, async newList => {
      currentPage.value = 1;
      const response = await tmdb.getMovieListPage(currentPage.value, newList);
      movies.value = response.movies;
      totalPages.value = response.pages;
    });

    function onPageChange(newPage: number) {
      currentPage.value = newPage;
    }
    watch(currentPage, async newPage => {
      const response = await tmdb.getMovieListPage(newPage, selectedList.value);
      movies.value = response.movies;
    });

    return {
      options,
      selectedList,
      listChanged,
      currentPage,
      totalPages,
      onPageChange,
      movies,
    };
  },
};
</script>
