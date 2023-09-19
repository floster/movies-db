import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppError from "../components/AppError";
import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import AppSpinner from "../components/AppSpinner";
import TMDB from "../js/tmdb-api";
import AppTile from "../components/AppTile";
import { SearchForm } from "../components/SearchForm";

import { useSearchResults } from "../hooks/useSearchResults";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env.VITE_SYMBOLS_QTY_TO_SEARCH as number;

// [x] TODO: make search form as a separate component
// [x] TODO: add search form
// [x] TODO: add pagination for results more than TILES_QTY_TO_SHOW
// [ ] TODO: add sorting for results (sort by rating by default)
// [ ] TODO: make possibility to show/hide results sections
// [ ] TODO: pull results without poster to the end of the list
// [ ] TODO: set focus on input field when click by search icon on search page
// [ ] TODO: open QuickSearch by cmd+k shortcut

export default function Search() {
  const params = useParams();
  const term = params.term || '';

  const {
    quantity,
    currentMovies,
    currentTvs,
    currentPersons,
    currentMoviesPage,
    currentTvsPage,
    currentPersonsPage,
    handleShowMore,
    handleSearchResults
  } = useSearchResults();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  useEffect(() => setSearchTerm(term || ''), [term]);
  const handleSearchSubmit = (searchTerm: string) => { setSearchTerm(searchTerm || ''); }
  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  // looking if searchTerm were changed and load search results accordingly
  const getSearchResults = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const searchResults = await TMDB.getAllSearch(searchTerm);

      handleSearchResults(searchResults);
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
                  <mark>{searchTerm.replace(/\+/g, ' ')}</mark>
                  &nbsp;➡ {quantity.all} [{quantity.movies}, {quantity.tvs}, {quantity.persons}]
                </h2>

                {(currentMovies.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`movies (${currentMovies.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {currentMovies.map((movie) => <AppTile tile={movie} key={movie.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('movies')}
                        disabled={currentMoviesPage >= quantity.moviesPages}
                      >
                        show more ({currentMoviesPage} / {quantity.moviesPages})
                      </button>
                    </div>
                  </AppSection>
                }
                {(currentTvs.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`tvs (${currentTvs.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {currentTvs.map((tv) => <AppTile tile={tv} key={tv.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('tvs')}
                        disabled={currentTvsPage >= quantity.tvsPages}
                      >
                        show more ({currentTvsPage} / {quantity.tvsPages})
                      </button>
                    </div>
                  </AppSection>
                }
                {(currentPersons.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader title={`persons (${currentPersons.length})`} alignStart />
                    <div className="l-tiles_grid m-movies">
                      {currentPersons.map((person) => <AppTile tile={person} key={person.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('persons')}
                        disabled={currentPersonsPage >= quantity.personsPages}
                      >
                        show more ({currentPersonsPage} / {quantity.personsPages})
                      </button>
                    </div>
                  </AppSection>
                }
              </>
        }
      </div>
    </>
  )
}
