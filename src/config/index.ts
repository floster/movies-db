const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

import {
  IAvailableListsOptions,
  IAvailableSortValues,
  IAvailableFavoritesTypes,
  IAvalableLocales,
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

interface SortOption {
  title: string
  value: IAvailableSortValues
}
export const SORT_OPTIONS: SortOption[] = [
  { title: 'Year 0-9', value: 'year_asc' },
  { title: 'Year 9-0', value: 'year_desc' },
  { title: 'Title A-W', value: 'title_asc' },
  { title: 'Title W-A', value: 'title_desc' },
]

type Locale = { title: string; value: IAvalableLocales }

// TODO: refactor all about locales
export const LOCALES: Locale[] = [
  { title: 'US', value: 'en' },
  { title: 'UA', value: 'uk' },
  { title: 'DE', value: 'de' },
]
