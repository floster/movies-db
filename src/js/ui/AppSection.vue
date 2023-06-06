<template>
  <section :class="classes">
    <app-section-header
      :title="title"
      :hasPagination="pagination"
      :paginationPage="paginationPage"
      @pageIncrease="$emit('pageIncrease')"
      @pageDecrease="$emit('pageDecrease')"
    ></app-section-header>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import AppSectionHeader from './AppSectionHeader.vue';
export default {
  props: {
    extraClass: String,
    title: String,
    pagination: Boolean,
    paginationPage: Number,
  },
  emits: ['pageIncrease', 'pageDecrease'],
  components: {
    AppSectionHeader,
  },

  setup(props) {
    const colSpan = props.extraClass ? ` m-${props.extraClass}` : '';
    const classes = `app-section${colSpan}`;

    return {
      classes,
    };
  },
};
</script>
