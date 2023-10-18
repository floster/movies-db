const BEARER_KEY = import.meta.env.VITE_TMDB_BEARER_KEY

import { IAvailableFavoritesTypes } from '../types/tmdb.models'

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
