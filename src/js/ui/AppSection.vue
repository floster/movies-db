<template>
  <section :class="classes">
    <app-section-header
      :title="title"
      :hasPagination="pagination"
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
  },
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
