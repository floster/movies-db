import { useEffect, useMemo, useState } from "react";
import { UTFavoritesType } from "../types/tmdb.types";

import { useLocalStorage } from "usehooks-ts";

export interface FavoritesHook {
  isFavoritable: (type: UTFavoritesType) => boolean;
  toggleFavorite: (type: UTFavoritesType, id: number) => void;
  getFavoritesByType: (type: UTFavoritesType) => number[];
  isAlreadyFavorite: (type: UTFavoritesType, id: number) => boolean;

  favoritesQty: number;
  moviesFavorites: number[];
  tvsFavorites: number[];
  personsFavorites: number[];
  collectionsFavorites: number[];
}

export const useFavoritesState = (): FavoritesHook => {
  const [moviesFavorites, setMoviesFavorites] = useLocalStorage(
    "moviesFavorites",
    [] as number[],
  );
  const [tvsFavorites, setTvsFavorites] = useLocalStorage(
    "tvsFavorites",
    [] as number[],
  );
  const [personsFavorites, setPersonsFavorites] = useLocalStorage(
    "personsFavorites",
    [] as number[],
  );
  const [collectionsFavorites, setCollectionsFavorites] = useLocalStorage(
    "collectionsFavorites",
    [] as number[],
  );

  const getFavoritesQty = useMemo(
    () =>
      moviesFavorites.length +
      tvsFavorites.length +
      personsFavorites.length +
      collectionsFavorites.length,
    [moviesFavorites, tvsFavorites, personsFavorites, collectionsFavorites],
  );

  const [favoritesQty, setFavoritesQty] = useState(() => getFavoritesQty || 0);

  const _addCallback = (prev: number[], id: number) => [
    ...new Set([...prev, id]),
  ];

  const _addFavorite = (type: UTFavoritesType, id: number) => {
    switch (type) {
      case "movie":
        setMoviesFavorites((prev) => _addCallback(prev, id));
        break;
      case "tv":
        setTvsFavorites((prev) => _addCallback(prev, id));
        break;
      case "person":
        setPersonsFavorites((prev) => _addCallback(prev, id));
        break;
      case "collection":
        setCollectionsFavorites((prev) => _addCallback(prev, id));
        break;
      default:
        break;
    }
  };

  const _removeCallback = (prev: number[], id: number) => {
    const set = new Set([...prev]);
    set.delete(id);
    return [...set];
  };

  const _removeFavorite = (type: UTFavoritesType, id: number) => {
    switch (type) {
      case "movie":
        setMoviesFavorites((prev) => _removeCallback(prev, id));
        break;
      case "tv":
        setTvsFavorites((prev) => _removeCallback(prev, id));
        break;
      case "person":
        setPersonsFavorites((prev) => _removeCallback(prev, id));
        break;
      case "collection":
        setCollectionsFavorites((prev) => _removeCallback(prev, id));
        break;
      default:
        break;
    }
  };

  const isFavoritable = (type: UTFavoritesType) =>
    ["movie", "tv", "person", "collection"].includes(type);

  const getFavoritesByType = (type: UTFavoritesType) => {
    return type === "movie"
      ? moviesFavorites
      : type === "tv"
      ? tvsFavorites
      : type === "person"
      ? personsFavorites
      : collectionsFavorites;
  };

  const isAlreadyFavorite = (type: UTFavoritesType, id: number) => {
    return type === "movie"
      ? moviesFavorites.includes(id)
      : type === "tv"
      ? tvsFavorites.includes(id)
      : type === "person"
      ? personsFavorites.includes(id)
      : collectionsFavorites.includes(id);
  };

  const toggleFavorite = (type: UTFavoritesType, id: number) => {
    isAlreadyFavorite(type, id)
      ? _removeFavorite(type, id)
      : _addFavorite(type, id);
  };

  useEffect(() => setFavoritesQty(() => getFavoritesQty), [getFavoritesQty]);

  return {
    isFavoritable,
    toggleFavorite,
    getFavoritesByType,
    isAlreadyFavorite,

    favoritesQty,
    moviesFavorites,
    tvsFavorites,
    personsFavorites,
    collectionsFavorites,
  };
};
