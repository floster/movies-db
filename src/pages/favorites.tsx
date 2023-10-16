import { useDocumentTitle } from "usehooks-ts";

import { useAppSelector } from "../hooks/useRedux";

import TilesGrid from "../components/TilesGrid";
import useGetTilesData from "../hooks/tmdb/getTilesData";
import AppSpinner from "../components/UI/AppSpinner";
import AppError from "../components/UI/AppError";

export default function Favorites() {
  useDocumentTitle("favorites - Movies DB");

  const favorites = useAppSelector((state) => state.favorites);

  const {
    tiles: collectionFavorites,
    isError: isCollectionError,
    isLoading: isCollectionLoading,
  } = useGetTilesData("collection", favorites.collection);

  const {
    tiles: movieFavorites,
    isError: isMovieError,
    isLoading: isMovieLoading,
  } = useGetTilesData("movie", favorites.movie);

  const {
    tiles: tvFavorites,
    isError: isTvError,
    isLoading: isTvLoading,
  } = useGetTilesData("tv", favorites.tv);

  const {
    tiles: personFavorites,
    isError: isPersonError,
    isLoading: isPersonLoading,
  } = useGetTilesData("person", favorites.person);

  return (
    <>
      <div className="l-content container">
        {isCollectionError ? (
          <AppError
            error={`Error occured while getting data for Collections favorites`}
          />
        ) : isCollectionLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <TilesGrid tiles={collectionFavorites} type="collection" />
        )}
        {isMovieError ? (
          <AppError
            error={`Error occured while getting data for Movies favorites`}
          />
        ) : isMovieLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <TilesGrid tiles={movieFavorites} type="movie" />
        )}
        {isTvError ? (
          <AppError
            error={`Error occured while getting data for Tvs favorites`}
          />
        ) : isTvLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <TilesGrid tiles={tvFavorites} type="tv" />
        )}
        {isPersonError ? (
          <AppError
            error={`Error occured while getting data for Persons favorites`}
          />
        ) : isPersonLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <TilesGrid tiles={personFavorites} type="person" />
        )}
      </div>
    </>
  );
}
