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

import {
  useSearchCollectionQuery,
  useSearchMultiQuery,
} from "../store/tmdb/tmdb.api";
import {
  IAvailableSearchAllTypes,
  ISearchResultsAll,
} from "../types/tmdb.models";

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
    data: searchMultiData,
    isError: isSearchMultiError,
    isLoading: isSearchMultiLoading,
  } = useSearchMultiQuery(searchTerm, {
    // prevents this query from automatically running if true
    skip: searchTermIsShort(),
  });

  const {
    // all search results
    data: searchCollectionData,
    isError: isSearchCollectionError,
    isLoading: isSearchCollectionLoading,
  } = useSearchCollectionQuery(searchTerm, {
    // prevents this query from automatically running if true
    skip: searchTermIsShort(),
  });

  const searchAllResults: ISearchResultsAll = {
    resultsQty:
      (searchMultiData?.resultsQty || 0) +
        (searchCollectionData?.length || 0) || 0,
    movie: searchMultiData?.movie || [],
    tv: searchMultiData?.tv || [],
    person: searchMultiData?.person || [],
    collection: searchCollectionData || [],
  };

  // set search term that comes from URLSearchParams: ?q=term into State
  useEffect(() => setSearchTerm(searchParams.get("q") || ""), [searchParams]);

  const handleSearchSubmit = (searchTerm: string) => {
    // set search term that comes from SearchForm to URLSearchParams: ?q=term
    setSearchParams({ q: searchTerm } || {});
  };

  const AVAILABLE_SEARCH_TYPES: IAvailableSearchAllTypes[] = [
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
        ) : isSearchMultiError || isSearchCollectionError ? (
          <AppError
            error={`Error occured while searching for #${searchTerm}`}
          />
        ) : isSearchMultiLoading || isSearchCollectionLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <>
            <h2 className="search-results__title">
              <mark>{searchTerm.replace(/\+/g, " ")}</mark>
              &nbsp;➡ {searchAllResults?.resultsQty} [
              {searchAllResults?.collection.length},{" "}
              {searchAllResults?.movie.length}, {searchAllResults?.tv.length},{" "}
              {searchAllResults?.person.length}]
            </h2>

            {AVAILABLE_SEARCH_TYPES.map((type) => {
              if (searchAllResults && searchAllResults[type])
                return (
                  <SearchResultsSection
                    key={type}
                    tiles={searchAllResults[type]}
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
