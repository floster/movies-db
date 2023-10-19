import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IAvailableFavoritesTypes } from '../../types/tmdb.models'

const LS_FAVORITES_KEY = 'rtk_favorites'

export type FavoritesState = {
  [key in IAvailableFavoritesTypes]: number[]
}

type FavoriteTogglePayload = {
  type: IAvailableFavoritesTypes
  id: number
}

const emptyLSFavorites: {
  [key in IAvailableFavoritesTypes]: number[]
} = { collection: [], movie: [], person: [], tv: [] }

if (localStorage.getItem(LS_FAVORITES_KEY) === null) {
  localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(emptyLSFavorites))
}

const initialState: FavoritesState = JSON.parse(
  localStorage.getItem(LS_FAVORITES_KEY) || '{}'
)

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggle: (state, { payload }: PayloadAction<FavoriteTogglePayload>) => {
      if (!state[payload.type].includes(payload.id)) {
        state[payload.type].push(payload.id)
      } else {
        state[payload.type] = state[payload.type].filter(
          item => item !== payload.id
        )
      }
      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(state))
    },
  },
})

export const favoritesActions = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
