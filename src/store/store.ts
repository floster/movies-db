import { configureStore } from '@reduxjs/toolkit'

import { tmdbApi } from './api/tmdb.api.ts'
import { favoritesReducer } from './slices/favorites.slice.ts'
import { dialogReducer } from './slices/dialog.slice.ts'
import { localeReducer } from './slices/locale.slice.ts'
import { accountReducer } from './slices/account.slice.ts'

// created 'store' should be 'provided' for whole app
// see 'main.tsx' line 10 - <Provider store={store}>...
export const store = configureStore({
  reducer: {
    // this key will have name 'tmdb_api'
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    favorites: favoritesReducer,
    locale: localeReducer,
    dialog: dialogReducer,
    account: accountReducer,
  },
  // inject default middleware to avoid warnings in browser's console
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

// setupListeners will add listeners for all defined endpoints
// it needs to make refetchOnFocus/refetchOnReconnect work
// setupListeners(store.dispatch);

// type RootState is used in 'useSelector' hook
export type RootState = ReturnType<typeof store.getState>
