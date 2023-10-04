import { useState } from "react";
import { useActions } from "../actions";
import { useAppSelector } from "../redux";

/**
 * A custom hook that manages the favorite state of a movie.
 * @param {number} id The ID of the movie.
 * @returns {{ isFavorite: boolean, toggleFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void }} An object containing the favorite state and a function to toggle the favorite state.
 */
export const useFavorite = (id: number) => {
  const { favorites } = useAppSelector((state) => state.tmdb);
  const { addFavorite, removeFavorite } = useActions();
  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.includes(String(id))
  );

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(String(id));
      setIsFavorite(false);
    } else {
      addFavorite(String(id));
      setIsFavorite(true);
    }
  };

  return { isFavorite, toggleFavorite };
};
