const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

// The delay time in milliseconds. After this amount of time, the latest value is used.
export const DEBOUNCE_DELAY = 500

import {
  IAvailableListsOptions,
  IAvailableSortValues,
  IAvailableFavoritesTypes,
  Locales,
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

export interface SelectOption<T> {
  title: string
  value: T
  default?: boolean
}
export const SORT_OPTIONS: SelectOption<IAvailableSortValues>[] = [
  { title: 'default', value: 'default' },
  { title: 'Year 9-0', value: 'year_desc' },
  { title: 'Year 0-9', value: 'year_asc' },
  { title: 'Title A-W', value: 'title_asc' },
  { title: 'Title W-A', value: 'title_desc' },
  { title: 'Rtng 9-0', value: 'rating_desc' },
  { title: 'Rtng 0-9', value: 'rating_asc' },
]

export const TILES_QTY_OPTIONS: SelectOption<IAvailableTilesQtyValues>[] = [
  { title: '5', value: '5' },
  { title: '10', value: '10', default: true },
  { title: '20', value: '20' },
  { title: 'all', value: 'all' },
]

type Locale = { title: string; value: Locales }

export const LOCALE_LOCAL_STORAGE_KEY = 'tmdb-locale'

export const LOCALES: Locale[] = [
  { title: 'US', value: Locales.en },
  { title: 'UA', value: Locales.uk },
  { title: 'DE', value: Locales.de },
]
