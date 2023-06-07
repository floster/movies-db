<template>
  <section class="app-section" :class="classes">
    <app-section-header v-if="title" :title="title"></app-section-header>
    <slot></slot>
  </section>
</template>

<script lang="ts">
import AppSectionHeader from './AppSectionHeader.vue';
export default {
  props: {
    extraClass: {
      type: String,
      default: '',
    },
    span: {
      type: String,
      default: '',
    },
    title: String,
  },
  components: {
    AppSectionHeader,
  },

  setup(props) {
    const span = props.span ? `col-span-${props.span}` : '';
    const classes = `${props.extraClass} ${span}`;

    return {
      classes,
    };
  },
};
</script>
