import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "./tmdb/tmdb.api.ts";
import { favoritesReducer } from "./favorites.slice.ts";

// created 'store' should be 'provided' for whole app
// see 'main.tsx' line 10 - <Provider store={store}>...
export const store = configureStore({
  reducer: {
    // this key will have name 'tmdb_api'
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    favorites: favoritesReducer,
  },
  // inject default middleware to avoid warnings in browser's console
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// setupListeners will add listeners for all defined endpoints
// it needs to make refetchOnFocus/refetchOnReconnect work
// setupListeners(store.dispatch);

// type RootState is used in 'useSelector' hook
export type RootState = ReturnType<typeof store.getState>;
