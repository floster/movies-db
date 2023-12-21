import type { TRawSearchResponse } from "~/types/tmdb-raw.types";
import type { TAvailableSearchsFields } from "~/types/tmdb.types";
import { EAvailableSearchTypes } from "~/types/tmdb.types";
import type { FetchError } from "ofetch";

import { defineStore, acceptHMRUpdate } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    query: "fast and furious",
    type: EAvailableSearchTypes.Movie,
    page: 1,
    results: null as TRawSearchResponse<TAvailableSearchsFields> | null,
    error: null as FetchError | null,
    loading: false,
  }),
  getters: {
    /**
     * @description results has more than 1 page
     * @returns boolean
     */
    hasPages: (state) => state.results && state.results?.total_pages > 1,
    /**
     * @description get the results total pages
     * @returns number
     */
    getTotalPages: (state) => state.results?.total_pages ?? 0,
  },
  actions: {
    /**
     * @description empty the query and reset the search
     * @returns void
     */
    clearQuery() {
      this.query = "";
      this.resetSearch();
    },
    /**
     * @description reset the search
     * @returns void
     */
    resetSearch() {
      this.page = 1;
      this.results = null;
    },
    /**
     * @description search for a query
     * @returns void
     */
    async search() {
      if (!this.query) return;

      this.loading = true;
      const { data, error } = await useFetch(`/api/search/${this.type}`, {
        params: {
          query: this.query,
          page: this.page,
        },
      });

      this.error = error.value;
      this.results = data.value ?? null;
      this.loading = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot));
}
