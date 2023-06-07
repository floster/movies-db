import { SelectOptions } from './types';

export const API_BASE = 'https://api.themoviedb.org/3';
export const API_KEY = '?api_key=e53afc585bcc1648f859c0ff148012ea';
export const API_POSTER_BASE =
  'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
export const API_BACKDROP_BASE =
  'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';

export const PARTS_PER_PAGE = 10;

export const OPTIONS_MOVIE_LIST: SelectOptions[] = [
  {title: 'Now Playing', value: 'now_playing'},
  {title: 'Popular', value: 'popular'},
  {title: 'Top Rated', value: 'top_rated'},
  {title: 'Upcoming', value: 'upcoming'},
];

export const MOVIE_LIST_TYPES = ['now_playing', 'popular', 'top_rated', 'upcoming'];