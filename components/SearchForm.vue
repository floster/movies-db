<script setup lang="ts">
/*
  imports
*/
import { EAvailableSearchTypes } from "~/types/tmdb.types";

/*
  consts
*/
interface ISearchType {
  label: string;
  value: EAvailableSearchTypes;
}
const AvailableSearchTypes: ISearchType[] = [
  { label: "all", value: EAvailableSearchTypes.All },
  { label: "movies", value: EAvailableSearchTypes.Movie },
  { label: "tvs", value: EAvailableSearchTypes.Tv },
  { label: "people", value: EAvailableSearchTypes.Person },
] as const;

/*
  props
*/
const props = defineProps<{
  modelValue: string;
  searchType: EAvailableSearchTypes;
}>();

/*
  emits
*/
const emit = defineEmits([
  "search-submit",
  "clear-search-query",
  "update:model-value",
  "update:search-type",
]);

/*
  refs
*/
const isDynamicSearch = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

/*
  functions
*/
const onQueryChange = (e: Event) => {
  const query = (e.target as HTMLInputElement).value;
  emit("update:model-value", query);
};

const onSearchTypeChange = (e: Event) => {
  const query = (e.target as HTMLSelectElement).value as EAvailableSearchTypes;
  emit("update:search-type", query);
};

const submitSearch = () => {
  emit("search-submit");
};
</script>

<template>
  <form
    @submit.prevent="submitSearch"
    class="flex flex-col gap-y-3 w-full mb-8"
  >
    <div class="flex items-center flex-wrap md:flex-nowrap gap-y-2">
      <!-- search field -->
      <div class="relative grow">
        <input
          ref="searchInput"
          class="input input-bordered rounded-xl rounded-tr-none rounded-br-none border-r-0 input-md md:input-lg w-full"
          type="text"
          name="search-term"
          placeholder="start search here..."
          :value="modelValue"
          @input="onQueryChange"
          @keydown.enter.prevent="submitSearch"
        />
        <button
          class="btn btn-ghost btn-sm opacity-40 hover:opacity-80 absolute z-10 right-4 top-1/2 transform -translate-y-1/2 hover:active:-translate-y-1/2"
          @click.self="emit('clear-search-query')"
          v-if="modelValue"
        >
          clear
        </button>
      </div>
      <select
        :value="searchType"
        @change="onSearchTypeChange"
        class="select select-bordered select-md md:select-lg rounded-none max-sm:rounded-tr-xl max-sm:rounded-br-xl"
        :class="{
          'md:rounded-tr-xl md:rounded-br-xl': isDynamicSearch,
        }"
      >
        <option
          v-for="searchType in AvailableSearchTypes"
          :value="searchType.value"
          :key="searchType.value"
        >
          {{ searchType.label }}
        </option>
      </select>
      <button
        v-if="!isDynamicSearch"
        class="btn btn-accent btn-md md:btn-lg max-sm:w-full rounded-xl md:rounded-tl-none md:rounded-bl-none"
        type="submit"
      >
        search
      </button>
    </div>
    <!-- /search field -->

    <div class="form-control w-fit">
      <label class="cursor-pointer label gap-x-2">
        <input
          v-model="isDynamicSearch"
          type="checkbox"
          class="checkbox checkbox-warning"
        />
        <span class="label-text">dynamic search</span>
      </label>
    </div>
  </form>
</template>
