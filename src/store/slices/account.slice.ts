import { createSlice } from '@reduxjs/toolkit'
import { ISupabaseAccountMeta } from '../../types/supabase.models'
import { IFavoritesState } from '../../types/tmdb.models'
import { INITIAL_FAVORITES_STATE } from '../../config'

type AccountState = {
  isAuthorized: boolean
  account: ISupabaseAccountMeta | null
  favorites: IFavoritesState
}

const initialState: AccountState = {
  isAuthorized: false,
  account: null,
  favorites: INITIAL_FAVORITES_STATE,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthorized: (state, { payload }) => {
      state.isAuthorized = payload
    },
    setAccount: (state, { payload }) => {
      state.account = payload
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload
    },
  },
})

export const accountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
