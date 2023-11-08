const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

export const LOCALE_LOCAL_STORAGE_KEY = 'tmdb-locale'

// The delay time in milliseconds. After this amount of time, the latest value is used.
export const DEBOUNCE_DELAY = 500

import {
  IAvailableListsOptions,
  ESortValues,
  IAvailableFavoritesTypes,
  ELocales,
  ETilesQty,
  EMediaTypes,
  Genre,
  IFavoritesState,
} from '../types/tmdb.models'

export const AVAILABLE_SEARCH_TYPES: IAvailableFavoritesTypes[] = [
  EMediaTypes.Collection,
  EMediaTypes.Movie,
  EMediaTypes.Tv,
  EMediaTypes.Person,
]

export const TMDB_FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_KEY}`,
  },
}

export const AVAILABLE_LIST_OPTIONS: IAvailableListsOptions[] = [
  'movie:now_playing',
  'movie:top_rated',
  'movie:upcoming',
  'tv:popular',
  'tv:top_rated',
]

export const INITIAL_FAVORITES_STATE: IFavoritesState = {
  collection: [],
  movie: [],
  person: [],
  tv: [],
}

export interface SelectOption<T> {
  title: string
  value: T
  default?: boolean
}
export const SORT_OPTIONS: SelectOption<ESortValues>[] = [
  { title: 'default', value: ESortValues.Default },
  { title: 'Year 9-0', value: ESortValues.YearDesc },
  { title: 'Year 0-9', value: ESortValues.YearAsc },
  { title: 'Title A-W', value: ESortValues.TitleAsc },
  { title: 'Title W-A', value: ESortValues.TitleDesc },
  { title: 'Rtng 9-0', value: ESortValues.RatingDesc },
  { title: 'Rtng 0-9', value: ESortValues.RatingAsc },
]

export const TILES_QTY_OPTIONS: SelectOption<ETilesQty>[] = [
  { title: '5', value: ETilesQty.Five },
  { title: '10', value: ETilesQty.Ten, default: true },
  { title: '20', value: ETilesQty.Twenty },
  { title: 'all', value: ETilesQty.All },
]

export const LOCALES: SelectOption<ELocales>[] = [
  { title: 'US', value: ELocales.en },
  { title: 'UA', value: ELocales.uk },
  { title: 'DE', value: ELocales.de },
]

export const GENRES: Genre[] = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
]
