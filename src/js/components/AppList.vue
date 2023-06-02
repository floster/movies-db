<template>
  <ul class="app-list flex flex-col gap-1 list-none m-0 p-0">
    <li
      v-for="item in data"
      :key="data.id"
      class="app-list__item border border-solid border-transparent hover:border-slate-200 hover:shadow-sm rounded-md overflow-hidden"
    >
      <movie-row :movie="item"></movie-row>
    </li>
  </ul>
</template>

<script lang="ts">
import { Movie } from "../types";
import MovieRow from "./MovieRow.vue";

export default {
  components: {
    MovieRow,
  },

  props: {
    data: {
      type: Object as () => Movie,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.app-list {
  &__item {
    overflow: hidden;
  }
}
</style>
