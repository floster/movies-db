import { createSlice } from '@reduxjs/toolkit'
import { IAvalableLocales } from '../../types/tmdb.models'
import { LOCALES, LOCALE_LOCAL_STORAGE_KEY } from '../../config'

type LocaleState = {
  current: IAvalableLocales
}

const initialState: LocaleState = {
  current: JSON.parse(
    localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY) || LOCALES[0].value
  ),
}

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      {
        localStorage.setItem(
          LOCALE_LOCAL_STORAGE_KEY,
          JSON.stringify(action.payload)
        )
        state.current = action.payload
      }
    },
  },
})

export const localeActions = localeSlice.actions
export const localeReducer = localeSlice.reducer
