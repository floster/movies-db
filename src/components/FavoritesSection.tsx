import { useCallback, useEffect, useState } from "react";
import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import AppTile from "../components/AppTile";
import {
  ICollection,
  IMovie,
  IPerson,
  ITileData,
  ITv,
  UTFavoritesType,
  UTileData,
} from "../types/tmdb.types";
import AppSpinner from "../components/AppSpinner";
import tmdb from "../js/tmdb-api";
import AppError from "../components/AppError";
import { formatTileData } from "../js/formatters";

import { useFavoritesState } from "../hooks/useFavoritesState";

export default function FavoritesSection({ type }: { type: UTFavoritesType }) {
  const {
    moviesFavorites,
    tvsFavorites,
    personsFavorites,
    collectionsFavorites,
  } = useFavoritesState();

  const currentFavoriteIDs =
    type === "movie"
      ? moviesFavorites
      : type === "tv"
      ? tvsFavorites
      : type === "person"
      ? personsFavorites
      : type === "collection"
      ? collectionsFavorites
      : [];

  const [favorites, setFavorites] = useState([] as ITileData[]);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isFavoriteError, setIsFavoriteError] = useState(false);

  // TODO: take a look at the last Copilot's suggestion
  const getFavoritesData = useCallback(() => {
    currentFavoriteIDs.forEach(async (favoriteId) => {
      if (favorites.some((favorite) => favorite.id === favoriteId)) return;

      try {
        setIsFavoriteLoading(true);
        let data = {} as ITileData;
        let rawData = {} as UTileData;
        switch (type) {
          case "collection":
            rawData = await tmdb.getCollection(favoriteId);
            data = formatTileData(
              rawData as ICollection,
              type,
              ["partsCount", "parts"],
              true,
            );
            break;
          case "movie":
            rawData = await tmdb.getMovie(favoriteId);
            data = formatTileData(rawData as IMovie, type, "year", true);
            break;
          case "person":
            rawData = await tmdb.getPerson(favoriteId);
            data = formatTileData(rawData as IPerson, type, "department", true);
            break;
          case "tv":
            rawData = await tmdb.getTvShow(favoriteId);
            data = formatTileData(
              rawData as ITv,
              type,
              ["seasons_qty", "seasons"],
              true,
            );
            break;
          default:
            setIsFavoriteError(true);
        }

        setFavorites((prevFavorites) => [...prevFavorites, data]);
      } catch (error) {
        setIsFavoriteError(true);
        console.error(error);
      } finally {
        setIsFavoriteLoading(false);
      }
    });
  }, [currentFavoriteIDs, type]);

  useEffect(() => getFavoritesData, [getFavoritesData]);

  return (
    <>
      {isFavoriteError ? (
        <AppError
          error={`Error occured while fetching data for a favorite ${type}`}
        />
      ) : (
        <>
          <AppSection extraClass="m-movies_list">
            <AppSectionHeader
              title={`${currentFavoriteIDs.length} ${type}s`}
              alignStart={true}
            />
            <div className="l-tiles_grid m-movies">
              {isFavoriteLoading ? (
                <AppSpinner visible={true} />
              ) : (
                favorites.map((favorite) => (
                  <AppTile tile={favorite} key={favorite.id} />
                ))
              )}
            </div>
          </AppSection>
        </>
      )}
    </>
  );
}
