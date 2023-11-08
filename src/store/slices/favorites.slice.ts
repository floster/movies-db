import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IAvailableFavoritesTypes,
  IFavoritesState,
} from '../../types/tmdb.models'
import { INITIAL_FAVORITES_STATE } from '../../config'
import { updateFavorites } from '../../supabase/client'

type FavoriteTogglePayload = {
  type: IAvailableFavoritesTypes
  id: number
  userId: string
}

const initialState = INITIAL_FAVORITES_STATE

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setInitialFavorites: (
      state,
      { payload }: PayloadAction<IFavoritesState>
    ) => {
      Object.keys(payload).forEach(key => {
        state[key as IAvailableFavoritesTypes] =
          payload[key as IAvailableFavoritesTypes]
      })
    },
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
      updateFavorites(state, payload.userId)
    },
  },
})

export const favoritesActions = favoritesSlice.actions
export const favoritesReducer = favoritesSlice.reducer
