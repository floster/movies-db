<script setup lang="ts">
const state = reactive({
  isDynamicSearch: false,
  query: "",
});

const emit = defineEmits(["search"]);

const searchInput = ref<HTMLInputElement | null>(null);

const onSubmit = async () => {
  const { data } = await useFetch(`/api/search/${state.query}`);

  if (data) {
    emit("search", data.value, state.query);
  }
};

const clearQuery = () => {
  state.query = "";
  searchInput.value?.focus();
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-y-3 w-full mb-8">
    <div class="flex items-center">
      <!-- search field -->
      <div class="relative grow">
        <input
          ref="searchInput"
          class="input input-bordered rounded-xl rounded-tr-none rounded-br-none border-r-0 input-md md:input-lg w-full"
          type="text"
          name="search-term"
          placeholder="start search here..."
          v-model="state.query"
        />
        <button
          class="btn btn-ghost btn-square btn-sm opacity-40 hover:opacity-80 absolute right-4 top-1/2 transform -translate-y-1/2"
          @click="clearQuery"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <select
        class="select select-bordered select-md md:select-lg rounded-none"
        :class="{
          'rounded-tr-xl rounded-br-xl': state.isDynamicSearch,
        }"
      >
        <option value="all">All</option>
        <option value="movies">Movies</option>
        <option value="tv-shows">TV Shows</option>
        <option value="people">People</option>
      </select>
      <button
        v-if="!state.isDynamicSearch"
        class="btn btn-accent btn-md md:btn-lg rounded-xl rounded-tl-none rounded-bl-none"
        type="submit"
      >
        Search
      </button>
    </div>
    <!-- /search field -->

    <div class="form-control w-fit">
      <label class="cursor-pointer label gap-x-2">
        <input
          v-model="state.isDynamicSearch"
          type="checkbox"
          checked
          class="checkbox checkbox-warning"
        />
        <span class="label-text">dynamic search</span>
      </label>
    </div>
  </form>
</template>
