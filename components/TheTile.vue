<script setup lang="ts">
import type { TAvailableTileFields } from "~/types/tmdb.types";
import { EPosterSizes } from "~/types/tmdb.types";
const {
  public: { tmdbImagesBaseUrl },
} = useRuntimeConfig();

const props = defineProps({
  data: {
    type: Object as PropType<TAvailableTileFields>,
    required: true,
  },
});

const picture = computed(() =>
  props.data.poster_path
    ? `${tmdbImagesBaseUrl}/${EPosterSizes.w780}${props.data.poster_path}`
    : props.data.profile_path
    ? `${tmdbImagesBaseUrl}/${EPosterSizes.w780}${props.data.profile_path}`
    : "./no-image.svg"
);

const title = computed(
  () => props.data.title ?? props.data.name ?? props.data.original_title
);

const label = computed(() =>
  props.data.release_date
    ? new Date(props.data.release_date).getFullYear()
    : props.data.first_air_date
    ? new Date(props.data.first_air_date).getFullYear()
    : props.data.known_for_department
);
</script>

<template>
  <article
    class="the-tile flex flex-col gap-y-2 pb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-slate-300 dark:shadow-slate-800 hover:shadow-md hover:shadow-sky-300 dark:hover:shadow-sky-800 overflow-hidden"
  >
    <NuxtPicture
      densities="1x, 2x"
      placeholder
      loading="lazy"
      fit="cover"
      :alt="data.title"
      :src="picture"
    />
    <header class="flex flex-col gap-2 px-2 lg:px-4">
      <p class="text-sky-600 dark:text-sky-500 font-serif text-base lg:text-lg">
        {{ label }}
      </p>
      <h2 class="text-lg lg:text-xl">{{ title }}</h2>
    </header>
  </article>
</template>
