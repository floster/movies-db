<template>
  <div class="join">
    <button class="join-item btn btn-xs" @click="pageDecrease">◀︎</button>
    <button class="join-item btn-xs" disabled>{{ page }}</button>
    <button class="join-item btn btn-xs" @click="pageIncrease">►</button>
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
  },
  emits: ['page-changed'],

  setup(props, ctx) {
    const currentPage = ref(props.page);

    function pageIncrease() {
      currentPage.value++;
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
