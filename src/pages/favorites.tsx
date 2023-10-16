import { useDocumentTitle } from "usehooks-ts";

import { useAppSelector } from "../hooks/useRedux";

import { IAvailableFavoritesTypes } from "../types/tmdb.models";
import FavoritesGrid from "../components/Favorites/FavoritesGrid";

const AVAILABLE_FAVORITES_TYPES: IAvailableFavoritesTypes[] = [
  "collection",
  "movie",
  "tv",
  "person",
];

export default function Favorites() {
  useDocumentTitle("favorites - Movies DB");

  // get favorites IDs from redux store
  const favorites = useAppSelector((state) => state.favorites);

  return (
    <div className="l-content container">
      {AVAILABLE_FAVORITES_TYPES.map((type) => {
        if (favorites[type].length > 0)
          return <FavoritesGrid ids={favorites[type]} type={type} key={type} />;
        else return null;
      })}
    </div>
  );
}
