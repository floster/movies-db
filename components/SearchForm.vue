<script setup lang="ts">
import { EAvailableSearchTypes } from "~/types/tmdb.types";

interface ISearchType {
  label: string;
  value: EAvailableSearchTypes;
}
const AvailableSearchOptions: ISearchType[] = [
  { label: "all", value: EAvailableSearchTypes.All },
  { label: "movies", value: EAvailableSearchTypes.Movie },
  { label: "collection", value: EAvailableSearchTypes.Collection },
  { label: "tvs", value: EAvailableSearchTypes.Tv },
  { label: "people", value: EAvailableSearchTypes.Person },
] as const;

const emit = defineEmits(["submit"]);

const store = useSearchStore();

const searchInput = ref<HTMLInputElement | null>(null);

const handleClearSearchQuery = () => {
  store.query = "";
  searchInput.value?.focus();
};
</script>

<template>
  <form @submit.prevent="emit('submit')" class="flex flex-col gap-y-3 w-full">
    <div class="flex items-center flex-wrap md:flex-nowrap gap-y-2">
      <div class="relative grow">
        <input
          ref="searchInput"
          class="input input-bordered rounded-xl rounded-tr-none rounded-br-none border-r-0 input-md md:input-lg w-full"
          type="text"
          name="search-term"
          placeholder="start search here..."
          v-model="store.query"
          @keydown.enter.prevent="emit('submit')"
        />
        <button
          class="btn btn-ghost btn-sm opacity-40 hover:opacity-80 absolute z-10 right-4 top-1/2 transform -translate-y-1/2 hover:active:-translate-y-1/2"
          @click.self="handleClearSearchQuery"
          v-if="store.query"
        >
          clear
        </button>
      </div>
      <select
        v-model="store.type"
        class="select select-bordered select-md md:select-lg rounded-none max-sm:rounded-tr-xl max-sm:rounded-br-xl"
      >
        <option
          v-for="option in AvailableSearchOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <button
        class="btn btn-accent btn-md md:btn-lg max-sm:w-full rounded-xl md:rounded-tl-none md:rounded-bl-none"
        type="submit"
      >
        search
      </button>
    </div>
  </form>
</template>
