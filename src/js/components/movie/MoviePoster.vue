<template>
  <picture class="movie-poster relative shrink-0" :class="extraClass">
    <app-loader v-show="isImageLoading"></app-loader>
    <img :src="src" :alt="title" @load="imageLoading" />
  </picture>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    title: String,
    extraClass: String,
  },

  setup() {
    const isImageLoading = ref(true);

    function imageLoading() {
      isImageLoading.value = false;
    }

    return {
      isImageLoading,
      imageLoading,
    };
  },
};
</script>

<style lang="scss">
.movie-poster {
  aspect-ratio: 1 / 1.5;
  font-size: 0;

  img {
    width: 100%;
    height: auto;
  }
}
</style>
