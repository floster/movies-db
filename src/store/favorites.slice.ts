import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const LS_FAVORITES_KEY = "rtk_favorites";

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAVORITES_KEY) || "[]"),
};

export const favoritesSlice = createSlice({
  name: "favorites",
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

export const favoritesActions = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
