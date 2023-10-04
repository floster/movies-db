import { FC, createContext, useContext } from "react";

import { FavoritesHook, useFavoritesState } from "../hooks/useFavoritesState";

const initialState: FavoritesHook = {
  isFavoritable: () => false,
  toggleFavorite: () => null,
  getFavoritesByType: () => [],
  isAlreadyFavorite: () => false,
  favoritesQty: 0,
};

const FavoritesContext = createContext(initialState);
export const useFavorites = () => useContext(FavoritesContext);

type Props = {
  children: React.ReactNode;
};
export const FavoritesProvider: FC<Props> = ({ children }) => {
  const {
    isFavoritable,
    toggleFavorite,
    getFavoritesByType,
    isAlreadyFavorite,
    favoritesQty,
  } = useFavoritesState();

  return (
    <FavoritesContext.Provider
      value={{
        isFavoritable,
        toggleFavorite,
        getFavoritesByType,
        isAlreadyFavorite,
        favoritesQty,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
