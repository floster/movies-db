const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

// The delay time in milliseconds. After this amount of time, the latest value is used.
export const DEBOUNCE_DELAY = 500

import {
  IAvailableListsOptions,
  IAvailableSortValues,
  IAvailableFavoritesTypes,
  IAvalableLocales,
  IAvailableTilesQtyValues,
} from '../types/tmdb.models'

export const AVAILABLE_SEARCH_TYPES: IAvailableFavoritesTypes[] = [
  'collection',
  'movie',
  'tv',
  'person',
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

export interface SelectOptions<T> {
  title: string
  value: T
  default?: boolean
}
export const SORT_OPTIONS: SelectOptions<IAvailableSortValues>[] = [
  { title: 'Year 0-9', value: 'year_asc', default: true },
  { title: 'Year 9-0', value: 'year_desc' },
  { title: 'Title A-W', value: 'title_asc' },
  { title: 'Title W-A', value: 'title_desc' },
]

export const TILES_QTY_OPTIONS: SelectOptions<IAvailableTilesQtyValues>[] = [
  { title: '5', value: 5 },
  { title: '10', value: 10, default: true },
  { title: '20', value: 20 },
  { title: 'all', value: 'all' },
]

type Locale = { title: string; value: IAvalableLocales }

// TODO: #locale refactor all about locales
export const LOCALES: Locale[] = [
  { title: 'US', value: 'en' },
  { title: 'UA', value: 'uk' },
  { title: 'DE', value: 'de' },
]
