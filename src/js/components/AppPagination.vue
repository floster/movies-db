<template>
  <div class="app-pagination">
    <button class="app-pagination__page" @click="pageDecrease">◀︎</button>
    <span class="app-pagination__counter" disabled>{{ page }} / {{ max }}</span>
    <button class="app-pagination__page" @click="pageIncrease">►</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  props: {
    page: {
      type: Number,
      required: false,
      default: 1,
    },
    max: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  emits: ['page-changed'],

  setup(props, ctx) {
    const currentPage = ref(props.page);

    function pageIncrease() {
      currentPage.value === props.max ? currentPage.value : currentPage.value++;
      ctx.emit('page-changed', currentPage.value);
    }

    function pageDecrease() {
      currentPage.value === 1 ? 1 : currentPage.value--;
      ctx.emit('page-changed', currentPage.value);
    }

    return {
      pageIncrease,
      pageDecrease,
    };
  },
};
</script>
