<template>
  <button class="button-favorite" @click="addFavorite">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
        d="M179.4 148a52.2 52.2 0 0 1-43.4 43.4"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="8"
        d="M72 65.4C56.6 88.6 44 115.2 44 140a84 84 0 0 0 168 0c0-52-36-92-65.2-121.1h0L112 92 72 65.4Z"
      />
    </svg>
  </button>
</template>
<script lang="ts">
import { store } from '../store';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    isMovie: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  setup(props) {
    function addFavorite() {
      if (props.isMovie) {
        store.addMovie(props.id);
      } else {
        store.addCollection(props.id);
      }
    }

    return {
      addFavorite,
    };
  },
};
</script>
<style lang="scss">
.button-favorite {
}
</style>
