import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppError from "../components/AppError";
import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import AppSpinner from "../components/AppSpinner";
import TMDB from "../js/tmdb-api";
import { ISearchResults, ITileData } from "../types/tmdb.types";
import AppTile from "../components/AppTile";
import { SearchForm } from "../components/SearchForm";
import { getTiles } from "../js/helpers";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env.VITE_SYMBOLS_QTY_TO_SEARCH as number;
const TILES_QTY_TO_SHOW = +import.meta.env.VITE_TILES_QTY_TO_SHOW as number;

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

  const [searchTerm, setSearchTerm] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  // TODO: try to make custom hook for handle results data
  const [movies, setMovies] = useState([] as ITileData[]);
  const [tvs, setTvs] = useState([] as ITileData[]);
  const [persons, setPersons] = useState([] as ITileData[]);

  const [quantity, setQuantity] = useState({ movies: 0, tvs: 0, persons: 0, all: 0, moviesPages: 0, tvsPages: 0, personsPages: 0 });

  const [currentMovies, setCurrentMovies] = useState([] as ITileData[]);
  const [currentTvs, setCurrentTvs] = useState([] as ITileData[]);
  const [currentPersons, setCurrentPersons] = useState([] as ITileData[]);

  const [currentMoviesPage, setCurrentMoviesPage] = useState(1);
  const [currentTvsPage, setCurrentTvsPage] = useState(1);
  const [currentPersonsPage, setCurrentPersonsPage] = useState(1);

  useEffect(() => setSearchTerm(term || ''), [term]);
  const handleSearchSubmit = (searchTerm: string) => { setSearchTerm(searchTerm || ''); }
  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  const calcQuantity = (results: ISearchResults) => ({
    movies: results.movies.length,
    tvs: results.tvs.length,
    persons: results.persons.length,
    all: results.movies.length + results.tvs.length + results.persons.length,
    moviesPages: Math.ceil(results.movies.length / TILES_QTY_TO_SHOW),
    tvsPages: Math.ceil(results.tvs.length / TILES_QTY_TO_SHOW),
    personsPages: Math.ceil(results.persons.length / TILES_QTY_TO_SHOW),
  });

  const calcTilesQtyToShow = (type: 'movies' | 'tvs' | 'persons') => {
    switch (type) {
      case 'movies':
        return currentMoviesPage * TILES_QTY_TO_SHOW;
      case 'tvs':
        return currentTvsPage * TILES_QTY_TO_SHOW;
      case 'persons':
        return currentPersonsPage * TILES_QTY_TO_SHOW;
      default:
        return 0;
    }
  }

  useEffect(() => {
    setCurrentMovies(getTiles(movies, 0, calcTilesQtyToShow('movies')));
  }, [currentMoviesPage]);

  useEffect(() => {
    setCurrentTvs(getTiles(tvs, 0, calcTilesQtyToShow('tvs')));
  }, [currentTvsPage]);

  useEffect(() => {
    setCurrentPersons(getTiles(persons, 0, calcTilesQtyToShow('persons')));
  }, [currentPersonsPage]);

  const handleShowMore = (type: string) => {
    switch (type) {
      case 'movies':
        if (currentMoviesPage >= quantity.moviesPages) return;
        setCurrentMoviesPage(current => current + 1);
        break;
      case 'tvs':
        if (currentTvsPage >= quantity.tvsPages) return;
        setCurrentTvsPage(current => current + 1);
        break;
      case 'persons':
        if (currentPersonsPage >= quantity.personsPages) return;
        setCurrentPersonsPage(current => current + 1);
        break;
      default:
        break;
    }
  }

  // looking if searchTerm were changed and load search results accordingly
  const getSearchResults = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const searchResults = await TMDB.getAllSearch(searchTerm);
      setQuantity(calcQuantity(searchResults))
      setMovies(searchResults.movies);
      setTvs(searchResults.tvs);
      setPersons(searchResults.persons);
      setCurrentMovies(getTiles(searchResults.movies, 0, calcTilesQtyToShow('movies')));
      setCurrentTvs(getTiles(searchResults.tvs, 0, calcTilesQtyToShow('tvs')));
      setCurrentPersons(getTiles(searchResults.persons, 0, calcTilesQtyToShow('persons')));
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
