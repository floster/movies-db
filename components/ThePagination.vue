<template>
  <div class="join overflow-x-auto max-w-full">
    <button
      v-for="num in qty"
      class="join-item btn btn-ghost btn-md"
      :class="{ 'btn-active': modelValue === num }"
      :key="num"
      @click="() => emit('update:modelValue', num)"
    >
      {{ num }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>
