import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LS_FAVORITES_KEY = "rtk_favorites";

interface TmdbState {
  favorites: string[];
}

const initialState: TmdbState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAVORITES_KEY) || "[]"),
};

export const tmdbSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
      localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const tmdbActions = tmdbSlice.actions;
export const tmdbReducer = tmdbSlice.reducer;
