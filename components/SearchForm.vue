<script setup lang="ts">
// import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  query: "",
});

// const validate = (state: any): FormError[] => {
//   const errors = [];
//   if (!state.query) errors.push({ path: "query", message: "Required" });
//   return errors;
// };

// async function onSubmit(event: FormSubmitEvent<any>) {
//   // Do something with data
//   console.log(event.data);
// }
</script>

<template>
  <form action="" class="flex flex-col gap-y-3 w-full mb-8">
    <div class="relative flex items-center">
      <!-- search field -->
      <input
        class="input input-bordered border-2 border-sky-500 rounded-xl input-md md:input-lg w-full"
        type="text"
        name="search-term"
        placeholder="start search here..."
        v-model="state.query"
      />
      <button
        class="absolute right-2 btn btn-ghost btn-md rounded-lg"
        type="submit"
      >
        Search
      </button>
    </div>
    <!-- /search field -->

    <div class="form-control w-fit">
      <label class="cursor-pointer label gap-x-2">
        <input type="checkbox" checked class="checkbox checkbox-warning" />
        <span class="label-text">dynamic search</span>
      </label>
    </div>
  </form>
</template>
