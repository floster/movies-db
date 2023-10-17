import { FC } from "react";
import {
  IAvailableFavoritesTypes,
  ISearchResults,
} from "../../types/tmdb.models";
import QuickSearchHitsList from "./QuickSearchHitsList";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number;

const AVAILABLE_SEARCH_TYPES: IAvailableFavoritesTypes[] = [
  "collection",
  "movie",
  "tv",
  "person",
];

interface QuickSearchHitsProps {
  searchHits: ISearchResults;
}

export const QuickSearchHits: FC<QuickSearchHitsProps> = ({ searchHits }) => {
  return (
    <section className="quick-search-hits">
      {searchHits.qty.all === 0 ? (
        <p className="quick-search-hits__empty">
          No results. To start searching enter at least {SYMBOLS_QTY_TO_SEARCH}{" "}
          symbols
        </p>
      ) : (
        <section className="quick-search-hits__list">
          {AVAILABLE_SEARCH_TYPES.map((type) => (
            <QuickSearchHitsList
              hits={searchHits.results[type]}
              type={type}
              key={type}
            />
          ))}
        </section>
      )}
    </section>
  );
};
