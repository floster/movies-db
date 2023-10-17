import {
  useSearchCollectionQuery,
  useSearchMultiQuery,
} from "../../store/tmdb/tmdb.api";
import { ISearchResultsAll } from "../../types/tmdb.models";

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

  const searchResults: ISearchResultsAll = {
    qty: {
      all:
        searchMultiData?.qty.all ||
        0 + (searchCollectionData ? searchCollectionData.length : 0),
      movie: searchMultiData?.qty.movie || 0,
      tv: searchMultiData?.qty.tv || 0,
      person: searchMultiData?.qty.person || 0,
      collection: searchCollectionData ? searchCollectionData.length : 0,
    },
    results: {
      movie: searchMultiData?.movie || [],
      tv: searchMultiData?.tv || [],
      person: searchMultiData?.person || [],
      collection: searchCollectionData || [],
    },
    isError: isSearchMultiError || isSearchCollectionError,
    isLoading: isSearchMultiLoading || isSearchCollectionLoading,
  };

  return { ...searchResults };
};

export default useSearch;
