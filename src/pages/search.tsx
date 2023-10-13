const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number;

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import AppError from "../components/UI/AppError";
import AppSpinner from "../components/UI/AppSpinner";
import { SearchForm } from "../components/SearchForm";

import { useSortOption } from "../hooks/useSortOption";
import { useSearchMultiQuery } from "../store/tmdb/tmdb.api";
import { IAvailableTrendingAndSearchAllTypes } from "../types/tmdb.models";
import SearchResultsSection from "../components/search/SearchResultsSection";
import AppMessage from "../components/UI/AppMessage";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  // reading/writing search params via URLSearchParams interface
  const [searchParams, setSearchParams] = useSearchParams();

  // set document title
  const title = searchTerm ? `searching '${searchTerm}'` : "search";
  useDocumentTitle(`${title} - Movies DB`);

  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  const {
    data: searchData,
    isError,
    isLoading,
  } = useSearchMultiQuery(searchTerm, {
    // prevents this query from automatically running if true
    skip: searchTermIsShort(),
  });

  // const { movies, tvs, persons, handleShowMore, handleSearchResults } =
  //   useSearchResults();

  const sortOptions: {
    [key in IAvailableTrendingAndSearchAllTypes]: {};
  } = {
    movie: useSortOption(),
    tv: useSortOption(),
    person: useSortOption(),
  };

  // const { sortedTiles: sortedMovies } = useTilesSort(
  //   movies.currentTiles,
  //   moviesSortOption.currentSortOption
  // );
  // const { sortedTiles: sortedTvs } = useTilesSort(
  //   tvs.currentTiles,
  //   tvsSortOption.currentSortOption
  // );
  // const { sortedTiles: sortedPersons } = useTilesSort(
  //   persons.currentTiles,
  //   personsSortOption.currentSortOption
  // );

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
        {searchTermIsShort() ? (
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
              if (searchData && searchData[type].length > 0)
                return (
                  <SearchResultsSection
                    data={searchData}
                    type={type}
                    sortOptions={sortOptions}
                  />
                );
            })}
          </>
        )}
      </div>
    </>
  );
}
