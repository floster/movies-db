import { FC, createContext, useContext } from "react";
import { UTFavoritesType } from "../types/tmdb.types";

import { AllFavorites, useFavoritesState } from "../hooks/useFavoritesState";

interface IFavorites {
  isFavoritable: (type: UTFavoritesType) => boolean;
  toggleFavorite: (type: UTFavoritesType, id: number) => void;
  getAllFavorites: () => AllFavorites;
  getFavoritesByType: (type: UTFavoritesType) => number[];
  isAlreadyFavorite: (type: UTFavoritesType, id: number) => boolean;
  favoritesQty: () => number;
}
const initialState: IFavorites = {
  isFavoritable: () => false,
  toggleFavorite: () => null,
  getAllFavorites: () => ({}) as AllFavorites,
  getFavoritesByType: () => [],
  isAlreadyFavorite: () => false,
  favoritesQty: () => 0,
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
    getAllFavorites,
    getFavoritesByType,
    isAlreadyFavorite,
    favoritesQty,
  } = useFavoritesState();

  return (
    <FavoritesContext.Provider
      value={{
        isFavoritable,
        toggleFavorite,
        getAllFavorites,
        getFavoritesByType,
        isAlreadyFavorite,
        favoritesQty,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
