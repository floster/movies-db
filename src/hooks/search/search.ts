import {
  useSearchCollectionQuery,
  useSearchMultiQuery,
} from "../../store/tmdb/tmdb.api";
import { ISearchResultsState } from "../../types/tmdb.models";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number;

const useSearch = (query: string) => {
  const queryIsShort = () => query.length < SYMBOLS_QTY_TO_SEARCH;

  const {
    // multi (movie, tv, person) search results
    data: searchMultiData,
    isError: isSearchMultiError,
    isLoading: isSearchMultiLoading,
  } = useSearchMultiQuery(query, {
    // prevents this query from automatically running if true
    skip: queryIsShort(),
  });

  const {
    // collection search results
    data: searchCollectionData,
    isError: isSearchCollectionError,
    isLoading: isSearchCollectionLoading,
  } = useSearchCollectionQuery(query, {
    // prevents this query from automatically running if true
    skip: queryIsShort(),
  });

  const searchResults: ISearchResultsState = {
    results: {
      collection: searchCollectionData || null,
      movie: searchMultiData?.movie || null,
      tv: searchMultiData?.tv || null,
      person: searchMultiData?.person || null,
    },
    isError: isSearchMultiError || isSearchCollectionError,
    isLoading: isSearchMultiLoading || isSearchCollectionLoading,
  };

  return searchResults;
};

export default useSearch;
