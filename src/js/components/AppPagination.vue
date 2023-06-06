<template>
  <div class="join">
    <button class="join-item btn btn-xs" @click="$emit('pageDecrease')">
      ◀︎
    </button>
    <button class="join-item btn-xs" disabled>{{ page }}</button>
    <button class="join-item btn btn-xs" @click="$emit('pageIncrease')">
      ►
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    page: Number,
  },
  emits: ['pageIncrease', 'pageDecrease'],
};
</script>
