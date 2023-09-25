import { UTFavoritesType } from "../types/tmdb.types";

import { useLocalStorage } from "usehooks-ts";

interface AllFavorites {
  moviesFavorites: number[];
  tvsFavorites: number[];
  personsFavorites: number[];
  collectionsFavorites: number[];
}

interface FavoritesHook {
  isFavoritable: (type: UTFavoritesType) => boolean;
  toggleFavorite: (type: UTFavoritesType, id: number) => void;
  getAllFavorites: () => AllFavorites;
  getFavoritesByType: (type: UTFavoritesType) => number[];
  isAlreadyFavorite: (type: UTFavoritesType, id: number) => boolean;
  favoritesQty: () => number;
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

  const getAllFavorites = (): AllFavorites => ({
    moviesFavorites,
    tvsFavorites,
    personsFavorites,
    collectionsFavorites,
  });
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

  const favoritesQty = () =>
    moviesFavorites.length +
    tvsFavorites.length +
    personsFavorites.length +
    collectionsFavorites.length;

  return {
    isFavoritable,
    toggleFavorite,
    getAllFavorites,
    getFavoritesByType,
    isAlreadyFavorite,
    favoritesQty,
  };
};
