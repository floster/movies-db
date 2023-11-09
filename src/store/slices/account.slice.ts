import { createSlice } from '@reduxjs/toolkit'
import { ISupabaseAccountMeta } from '../../types/supabase.models'

type AccountState = {
  isAuthorized: boolean
  isGod: boolean
  account: ISupabaseAccountMeta | null
}

const initialState: AccountState = {
  isAuthorized: false,
  isGod: false,
  account: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthorized: (state, { payload }) => {
      state.isAuthorized = payload
    },
    setGod: (state, { payload }) => {
      state.isGod = payload
    },
    setAccount: (state, { payload }) => {
      state.account = payload
    },
  },
})

export const accountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
