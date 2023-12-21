<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <Icon
        :name="`ph:sun-dim-${isDarkMode ? 'light' : 'fill'}`"
        size="24"
        :class="`${
          !isDarkMode ? 'text-amber-400' : 'text-slate-300 dark:text-gray-600'
        }`"
      />
      <input v-model="isDarkMode" type="checkbox" class="toggle toggle-sm" />
      <Icon
        :name="`ph:moon-stars-${isDarkMode ? 'fill' : 'light'}`"
        size="24"
        :class="`${
          isDarkMode ? 'text-sky-600' : 'text-slate-300 dark:text-gray-600'
        }`"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
const isDarkMode = ref(false);
</script>
