import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppError from "../components/AppError";
import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import AppSpinner from "../components/AppSpinner";
import TMDB from "../js/tmdb-api";
import { ISearchResults } from "../types/tmdb.types";
import AppTile from "../components/AppTile";
import { SearchForm } from "../components/SearchForm";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env.VITE_SYMBOLS_QTY_TO_SEARCH as number;

type CollectionParams = {
  term: string;
}

// [x] TODO: make search form as a separate component
// [x] TODO: add search form
// [ ] TODO: add pagination for results more than 20
// [ ] TODO: add sorting for results (sort by rating by default)
// [ ] TODO: make possibility to show/hide results sections
// [ ] TODO: pull results without poster to the end of the list
// [ ] TODO: set focus on input field, that will be created in the future

export default function Search() {
  const params = useParams<CollectionParams>();
  const term = params.term || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({} as ISearchResults);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  useEffect(() => setSearchTerm(term || ''), [term]);
  const handleSearchSubmit = (searchTerm: string) => { setSearchTerm(searchTerm || ''); }

  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;
  const formattedSearchTerm = () => searchTerm.replace(/\s/g, '+');
  const getResultsLength = () => ({
    all: results.movies?.length + results.tvs?.length + results.persons?.length,
    movies: results.movies?.length,
    tvs: results.tvs?.length,
    persons: results.persons?.length
  });

  const getSearchResults = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const searchResults = await TMDB.getAllSearch(searchTerm);
      setResults(searchResults);
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTermIsShort()) {
      const fetchData = async () => {
        await (getSearchResults as () => Promise<void>)();
      };
      fetchData();
    }
  }, [getSearchResults]);

  return (
    <>
      <section className="container">
        <SearchForm searchSubmit={handleSearchSubmit} />
      </section>
      <div className="l-content container search-results">
        {searchTermIsShort()
          ? <p className="message m-info align-self-center"><span className="message__icon">ℹ</span> Enter at least <strong>{SYMBOLS_QTY_TO_SEARCH}</strong> symbols to start searching</p>
          : isDataError
            ? <AppError error={`Error occured while finding for #${term}`} />
            : isDataLoading
              ? <AppSpinner visible={true} />
              : <>
                <h2 className="search-results__title">
                  🔎: <mark>{formattedSearchTerm()}</mark>
                  &nbsp;➡ {getResultsLength().all} [{getResultsLength().movies}, {getResultsLength().tvs}, {getResultsLength().persons}]
                </h2>
                {(results.movies && results.movies.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`movies (${results.movies.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {results.movies.map((movie) => <AppTile tile={movie} key={movie.id} />)}
                    </div>
                  </AppSection>
                }
                {(results.tvs && results.tvs.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`tvs (${results.tvs.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {results.tvs.map((tv) => <AppTile tile={tv} key={tv.id} />)}
                    </div>
                  </AppSection>
                }
                {(results.persons && results.persons.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`persons (${results.persons.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {results.persons.map((person) => <AppTile tile={person} key={person.id} />)}
                    </div>
                  </AppSection>
                }
              </>
        }
      </div>
    </>
  )
}
