<template>
  <div>
    <header v-if="title" class="app-section-header flex items-center mb-4">
      <h2 class="app-section__title mr-auto text-xl text-sky-800">
        {{ title }}
      </h2>
      <app-pagination v-if="hasPagination"></app-pagination>
    </header>
  </div>
</template>

<script lang="ts">
import AppPagination from '../components/AppPagination.vue';

export default {
  props: {
    title: String,
    hasPagination: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    AppPagination,
  },
};
</script>
