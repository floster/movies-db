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
import { useTilesSort } from "../hooks/useTilesSort";
import { useSortOption } from "../hooks/useSortOption";

import { useDocumentTitle } from "@uidotdev/usehooks";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env.VITE_SYMBOLS_QTY_TO_SEARCH as number;

// [x] TODO: make search form as a separate component
// [x] TODO: add search form
// [x] TODO: add pagination for results more than TILES_QTY_TO_SHOW
// [x] TODO: add sorting for results (sort by rating by default)
// [-] TODO: make possibility to show/hide results sections
// [x] TODO: pull results without poster to the end of the list
// [x] TODO: set focus on input field when click by search icon on search page
// [ ] TODO: open QuickSearch by cmd+k shortcut
// [ ] TODO: animation for search results ('show more' clicked | sorting changed)

export default function Search() {
  const params = useParams();
  const term = params.term || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const title = searchTerm ? `searching '${searchTerm}'` : 'search';
  useDocumentTitle(`${title} - Movies DB`);

  const {
    movies,
    tvs,
    persons,
    handleShowMore,
    handleSearchResults
  } = useSearchResults();

  const moviesSortOption = useSortOption();
  const tvsSortOption = useSortOption();
  const personsSortOption = useSortOption();

  const { sortedTiles: sortedMovies } = useTilesSort(movies.currentTiles, moviesSortOption.currentSortOption);
  const { sortedTiles: sortedTvs } = useTilesSort(tvs.currentTiles, tvsSortOption.currentSortOption);
  const { sortedTiles: sortedPersons } = useTilesSort(persons.currentTiles, personsSortOption.currentSortOption);

  useEffect(() => setSearchTerm(term || ''), [term]);
  const handleSearchSubmit = (searchTerm: string) => { setSearchTerm(searchTerm || ''); }
  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH;

  const calcAllTilesQty = () => movies.qty.tiles + tvs.qty.tiles + persons.qty.tiles;

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
      <section className="container search-form">
        <SearchForm searchSubmit={handleSearchSubmit} />
      </section>
      <div className="l-content container search-results">
        {searchTermIsShort()
          ? <p className="message m-info align-self-center">
            <span className="message__icon">ℹ</span> Enter at least <strong>{SYMBOLS_QTY_TO_SEARCH}</strong> symbols to start searching
          </p>
          : isDataError
            ? <AppError error={`Error occured while finding for #${term}`} />
            : isDataLoading
              ? <AppSpinner visible={true} />
              : <>
                <h2 className="search-results__title">
                  <mark>{searchTerm.replace(/\+/g, ' ')}</mark>
                  &nbsp;➡ {calcAllTilesQty()} [{movies.qty.tiles}, {tvs.qty.tiles}, {persons.qty.tiles}]
                </h2>

                {(sortedMovies.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader
                      title={`movies (${movies.qty.tiles})`}
                      alignStart
                      hasSelect={true}
                      {...moviesSortOption}
                    />
                    <div className="l-tiles_grid m-movies">
                      {sortedMovies.map((movie) => <AppTile tile={movie} key={movie.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('movies')}
                        disabled={movies.currentPage >= movies.qty.pages}
                      >
                        show more ({movies.currentPage} / {movies.qty.pages})
                      </button>
                    </div>
                  </AppSection>
                }
                {(sortedTvs.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader
                      title={`tvs (${tvs.qty.tiles})`}
                      alignStart
                      hasSelect={true}
                      {...tvsSortOption}
                    />
                    <div className="l-tiles_grid m-movies">
                      {sortedTvs.map((tv) => <AppTile tile={tv} key={tv.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('tvs')}
                        disabled={tvs.currentPage >= tvs.qty.pages}
                      >
                        show more ({tvs.currentPage} / {tvs.qty.pages})
                      </button>
                    </div>
                  </AppSection>
                }
                {(sortedPersons.length > 0) &&
                  <AppSection extraClass='m-movies_list'>
                    <AppSectionHeader
                      title={`persons (${persons.qty.tiles})`}
                      alignStart
                      hasSelect={true}
                      {...personsSortOption}
                    />
                    <div className="l-tiles_grid m-movies">
                      {sortedPersons.map((person) => <AppTile tile={person} key={person.id} />)}
                      <button
                        className="app-button"
                        onClick={() => handleShowMore('persons')}
                        disabled={persons.currentPage >= persons.qty.pages}
                      >
                        show more ({persons.currentPage} / {persons.qty.pages})
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
