<template>
  <select
    class="app-select"
    @change="$emit('option-changed', current)"
    v-model="current"
  >
    <option v-for="option in options" :value="option.value">
      {{ option.title }}
    </option>
  </select>
</template>

<script lang="ts">
import { ref } from 'vue';
import { SelectOptions } from '../types';

export default {
  props: {
    options: {
      type: Array as () => SelectOptions[],
      required: true,
    },
    defaultOption: {
      type: String,
      required: true,
    },
  },
  emits: ['option-changed'],
  setup(props) {
    const current = ref('');
    current.value = props.defaultOption;

    return {
      current,
    };
  },
};
</script>
