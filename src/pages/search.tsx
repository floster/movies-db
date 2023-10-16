const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import AppError from "../components/UI/AppError";
import AppSpinner from "../components/UI/AppSpinner";
import { SearchForm } from "../components/SearchForm";
import SearchResultsSection from "../components/search/SearchResultsSection";
import AppMessage from "../components/UI/AppMessage";

import { useSearchMultiQuery } from "../store/tmdb/tmdb.api";
import { IAvailableTrendingAndSearchAllTypes } from "../types/tmdb.models";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  // reading/writing search params via URLSearchParams interface
  const [searchParams, setSearchParams] = useSearchParams();

  // set document title
  const title = searchTerm ? `searching '${searchTerm}'` : "search";
  useDocumentTitle(`${title} - Movies DB`);

  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  const {
    // all search results
    data: searchData,
    isError,
    isLoading,
  } = useSearchMultiQuery(searchTerm, {
    // prevents this query from automatically running if true
    skip: searchTermIsShort(),
  });

  // set search term that comes from URLSearchParams: ?q=term into State
  useEffect(() => setSearchTerm(searchParams.get("q") || ""), [searchParams]);

  const handleSearchSubmit = (searchTerm: string) => {
    // set search term that comes from SearchForm to URLSearchParams: ?q=term
    setSearchParams({ q: searchTerm } || {});
  };

  const AVAILABLE_SEARCH_TYPES: IAvailableTrendingAndSearchAllTypes[] = [
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
          <AppError error={`Error occured while finding for #${searchTerm}`} />
        ) : isLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <>
            <h2 className="search-results__title">
              <mark>{searchTerm.replace(/\+/g, " ")}</mark>
              &nbsp;➡ {searchData?.resultsQty} [{searchData?.movie.length},{" "}
              {searchData?.tv.length}, {searchData?.person.length}]
            </h2>

            {AVAILABLE_SEARCH_TYPES.map((type) => {
              if (searchData && searchData[type])
                return (
                  <SearchResultsSection
                    key={type}
                    tiles={searchData[type]}
                    type={type}
                  />
                );
            })}
          </>
        )}
      </div>
    </>
  );
}
