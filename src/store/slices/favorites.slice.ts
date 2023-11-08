import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IAvailableFavoritesTypes,
  IFavoritesState,
} from '../../types/tmdb.models'
import { INITIAL_FAVORITES_STATE } from '../../config'

const LS_FAVORITES_KEY = 'rtk_favorites'

type FavoriteTogglePayload = {
  type: IAvailableFavoritesTypes
  id: number
}

// Check if the local storage has the favorites key, if not, set it to the initial state
if (localStorage.getItem(LS_FAVORITES_KEY) === null) {
  localStorage.setItem(
    LS_FAVORITES_KEY,
    JSON.stringify(INITIAL_FAVORITES_STATE)
  )
}

const initialState: IFavoritesState = JSON.parse(
  localStorage.getItem(LS_FAVORITES_KEY) || '{}'
)

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (
      state,
      { payload }: PayloadAction<FavoriteTogglePayload>
    ) => {
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
