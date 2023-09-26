import { FC, createContext, useContext } from "react";
import { UTFavoritesType } from "../types/tmdb.types";

import { IAllFavorites, useFavoritesState } from "../hooks/useFavoritesState";

interface IFavorites {
  isFavoritable: (type: UTFavoritesType) => boolean;
  toggleFavorite: (type: UTFavoritesType, id: number) => void;
  getAllFavorites: () => IAllFavorites;
  getFavoritesByType: (type: UTFavoritesType) => number[];
  isAlreadyFavorite: (type: UTFavoritesType, id: number) => boolean;
  getFavoritesQty: () => number;
}
const initialState: IFavorites = {
  isFavoritable: () => false,
  toggleFavorite: () => null,
  getAllFavorites: () => ({}) as IAllFavorites,
  getFavoritesByType: () => [],
  isAlreadyFavorite: () => false,
  getFavoritesQty: () => 0,
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
    getFavoritesQty,
  } = useFavoritesState();

  return (
    <FavoritesContext.Provider
      value={{
        isFavoritable,
        toggleFavorite,
        getAllFavorites,
        getFavoritesByType,
        isAlreadyFavorite,
        getFavoritesQty,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
