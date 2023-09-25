import { useState } from "react";
import { UTFavoritesType } from "../types/tmdb.types";

interface AllFavorites {
  movie: number[];
  tv: number[];
  person: number[];
  collection: number[];
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
  const [movie, setMovie] = useState([565770, 762430] as number[]);
  const [tv, setTv] = useState([] as number[]);
  const [person, setPerson] = useState([] as number[]);
  const [collection, setCollection] = useState([] as number[]);

  const _addCallback = (prev: number[], id: number) => [
    ...new Set([...prev, id]),
  ];

  const _addFavorite = (type: UTFavoritesType, id: number) => {
    switch (type) {
      case "movie":
        setMovie((prev) => _addCallback(prev, id));
        break;
      case "tv":
        setTv((prev) => _addCallback(prev, id));
        break;
      case "person":
        setPerson((prev) => _addCallback(prev, id));
        break;
      case "collection":
        setCollection((prev) => _addCallback(prev, id));
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
        setMovie((prev) => _removeCallback(prev, id));
        break;
      case "tv":
        setTv((prev) => _removeCallback(prev, id));
        break;
      case "person":
        setPerson((prev) => _removeCallback(prev, id));
        break;
      case "collection":
        setCollection((prev) => _removeCallback(prev, id));
        break;
      default:
        break;
    }
  };

  const isFavoritable = (type: UTFavoritesType) =>
    ["movie", "tv", "person", "collection"].includes(type);

  const getAllFavorites = (): AllFavorites => ({
    movie,
    tv,
    person,
    collection,
  });
  const getFavoritesByType = (type: UTFavoritesType) => {
    return type === "movie"
      ? movie
      : type === "tv"
      ? tv
      : type === "person"
      ? person
      : collection;
  };

  const isAlreadyFavorite = (type: UTFavoritesType, id: number) => {
    return type === "movie"
      ? movie.includes(id)
      : type === "tv"
      ? tv.includes(id)
      : type === "person"
      ? person.includes(id)
      : collection.includes(id);
  };

  const toggleFavorite = (type: UTFavoritesType, id: number) => {
    isAlreadyFavorite(type, id)
      ? _removeFavorite(type, id)
      : _addFavorite(type, id);
  };

  const favoritesQty = () =>
    movie.length + tv.length + person.length + collection.length;

  return {
    isFavoritable,
    toggleFavorite,
    getAllFavorites,
    getFavoritesByType,
    isAlreadyFavorite,
    favoritesQty,
  };
};
