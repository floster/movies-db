import { createSlice } from '@reduxjs/toolkit'

type AccountState = {
  isAuthorized: boolean
}

const initialState: AccountState = {
  isAuthorized: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthorized: (state, { payload }) => {
      state.isAuthorized = payload
    },
  },
})

export const accountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
