import { createSlice } from '@reduxjs/toolkit'
import { ISupabaseUserMeta } from '../../types/supabase.models'

type AccountState = {
  isAuthorized: boolean
  session: ISupabaseUserMeta | null
}

const initialState: AccountState = {
  isAuthorized: false,
  session: null,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthorized: (state, { payload }) => {
      state.isAuthorized = payload
    },
    setSession: (state, { payload }) => {
      state.session = payload
    },
  },
})

export const accountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
