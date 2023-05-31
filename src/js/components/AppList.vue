<template>
  <ul class="app-list">
    <li v-for="popular in populars">
      <movie-tile :movie="popular"></movie-tile>
    </li>
  </ul>
</template>

<script lang="ts">
import tmdb from "../tmdb";
import MovieTile from "./MovieTile.vue";

export default {
  components: {
    MovieTile,
  },

  async setup() {
    const populars = await tmdb.getPopulars();
    console.log(populars);

    return {
      populars,
    };
  },
};
</script>

<style lang="scss">
.app-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
