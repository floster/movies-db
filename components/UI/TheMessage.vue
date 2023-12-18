<template>
  <div role="alert" class="alert" :class="alertClass">
    <Icon
      v-if="type === 'info'"
      name="ph:info"
      size="24"
      class="text-amber-500"
    />
    <Icon
      v-if="type === 'error'"
      name="ph:warning"
      size="24"
      class="text-rose-300"
    />
    <span class="text-rose-200">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  type?: "error" | "info";
}
const props = withDefaults(defineProps<Props>(), {
  type: "info",
});

const alertClass = computed(() => {
  return props.type === "error" ? "alert-error" : "";
});
</script>
