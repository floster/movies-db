import { MOVIES_1000, MOVIES_500 } from './config';
import { reactive } from 'vue';

export const store = reactive({
  top1000: MOVIES_1000,
  top500: MOVIES_500,

  movies: [] as number[],
  collections: [] as number[],

  addMovie(id: number) {
    if (this.movies.includes(id)) return;

    this.movies.push(id);
  },

  addCollection(id: number) {
    if (this.collections.includes(id)) return;

    this.collections.push(id);
  },
});