const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import AppError from "../components/UI/AppError";
import AppSpinner from "../components/UI/AppSpinner";
import { SearchForm } from "../components/SearchForm";
import TilesGrid from "../components/TilesGrid";
import AppMessage from "../components/UI/AppMessage";

import { IAvailableFavoritesTypes } from "../types/tmdb.models";
import useSearch from "../hooks/search/search";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  // reading/writing search params via URLSearchParams interface
  const [searchParams, setSearchParams] = useSearchParams();

  // set document title
  const title = searchTerm ? `searching '${searchTerm}'` : "search";
  useDocumentTitle(`${title} - Movies DB`);

  const { results, qty, isError, isLoading } = useSearch(searchTerm);

  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  // set search term that comes from URLSearchParams: ?q=term into State
  useEffect(() => setSearchTerm(searchParams.get("q") || ""), [searchParams]);

  const handleSearchSubmit = (searchTerm: string) => {
    // set search term that comes from SearchForm to URLSearchParams: ?q=term
    setSearchParams({ q: searchTerm } || {});
  };

  const AVAILABLE_SEARCH_TYPES: IAvailableFavoritesTypes[] = [
    "collection",
    "movie",
    "tv",
    "person",
  ];

  return (
    <>
      <section className="container search-form">
        <SearchForm searchSubmit={handleSearchSubmit} />
      </section>
      <div className="l-content container search-results">
        {searchTerm.length === 0 ? (
          ""
        ) : searchTermIsShort() ? (
          <AppMessage
            message={`Enter at least ${SYMBOLS_QTY_TO_SEARCH} symbols to start searching`}
          />
        ) : isError ? (
          <AppError
            error={`Error occured while searching for #${searchTerm}`}
          />
        ) : isLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <>
            <h2 className="search-results__title">
              <mark>{searchTerm.replace(/\+/g, " ")}</mark>
              &nbsp;➡ {qty.all} [
              {AVAILABLE_SEARCH_TYPES.map((type) => qty[type]).join(", ")}]
            </h2>

            {AVAILABLE_SEARCH_TYPES.map((type) => {
              if (results && results[type])
                return (
                  <TilesGrid key={type} tiles={results[type]} type={type} />
                );
            })}
          </>
        )}
      </div>
    </>
  );
}
