import FavoritesSection from "../components/FavoritesSection";
import { useDocumentTitle } from "usehooks-ts";

export default function Favorites() {
  useDocumentTitle("favorites - Movies DB");

  return (
    <>
      <div className="l-content container">
        <FavoritesSection type="collection" />
        <FavoritesSection type="movie" />
        <FavoritesSection type="person" />
        <FavoritesSection type="tv" />
      </div>
    </>
  );
}
