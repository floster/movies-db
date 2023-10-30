import { createSlice } from '@reduxjs/toolkit'
import { IAvalableLocales } from '../../types/tmdb.models'
import { LOCALES } from '../../config'

type LocaleState = {
  current: IAvalableLocales
}

const initialState: LocaleState = {
  current: LOCALES[0].value,
}

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.current = action.payload
    },
  },
})

export const localeActions = localeSlice.actions
export const localeReducer = localeSlice.reducer
