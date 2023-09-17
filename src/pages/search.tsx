import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppError from "../components/AppError";
import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import AppSpinner from "../components/AppSpinner";
// import AppTile from "../components/AppTile";
import TMDB from "../js/tmdb-api";
import { ISearchResults } from "../types/tmdb.types";
import AppTile from "../components/AppTile";

type CollectionParams = {
  term: string;
}

// [ ] TODO: add pagination for results more than 20
// [ ] TODO: add sorting for results (sort by rating by default)
// [ ] TODO: make possibility to show/hide results sections
// [ ] TODO: pull results without poster to the end of the list
// [ ] TODO: set focus on input field, that will be created in the future

export default function Search() {
  const params = useParams<CollectionParams>();
  const term = params.term?.split('+').join('%20');

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [results, setResults] = useState({} as ISearchResults);

  const getSearchResults = useCallback(async () => {
    // clear hits array to clear its UI container
    if (!term) {
      // set focus on input field, that will be created in the future
      return
    };

    try {
      setIsDataLoading(true);
      const searchResults = await TMDB.getAllSearch(term);
      setResults(searchResults);
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [term]);

  useEffect(() => {
    const fetchData = async () => {
      await (getSearchResults as () => Promise<void>)();
    };
    fetchData();
  }, [getSearchResults]);

  return (
    <div className="l-content container">
      {isDataError
        ? <AppError error={`Error occured while finding for #${term}`} />
        : isDataLoading
          ? <AppSpinner visible={true} />
          : <>
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
  )
}
