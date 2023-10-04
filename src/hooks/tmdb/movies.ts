import { useEffect, useState } from "react";
import { useAppSelector } from "../redux";
import { useLazyGetMovieQuery } from "../../store/tmdb/tmdb.api";
import { ICollectionPart } from "../../models/tmdb.models";

/**
 * A custom hook that fetches and displays a list of favorite movies.
 * @returns {{ tiles: ICollectionPart[], isError: boolean, isLoading: boolean }} An object containing the list of movie tiles, an error flag, and a loading flag.
 */
export const useMovies = () => {
  const { favorites } = useAppSelector((state) => state.tmdb);
  const [tiles, setTiles] = useState<ICollectionPart[] | []>([]);

  const [getMovie, { isError, isLoading }] = useLazyGetMovieQuery();

  // go through favorites and get each movie, for that:
  useEffect(() => {
    const getFavorites = async () => {
      // 3. waiting for all promises to resolve
      const favs = await Promise.all(
        // 1. went through favorites IDs
        favorites.map(async (id) => {
          // 2. return a promise for each movie to get the data
          const { data } = await getMovie(id);
          return data;
        })
      );
      // 5. set the tiles
      setTiles(
        // 4. filter out undefined values
        favs.filter((tile): tile is ICollectionPart => tile !== undefined)
      );
    };
    getFavorites();
  }, [favorites]);

  return { tiles, isError, isLoading };
};
