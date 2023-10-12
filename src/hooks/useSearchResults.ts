import { ISearchResults, ITileData } from "../types/tmdb.types";
import { useTilesShowMore } from "./tiles/tilesShowMore";

type UseSearchResultsItem = {
  qty: {
    tiles: number;
    pages: number;
  };
  currentPage: number;
  currentTiles: ITileData[];
};
interface UseSearchResults {
  movies: UseSearchResultsItem;
  tvs: UseSearchResultsItem;
  persons: UseSearchResultsItem;
  handleShowMore: (type: string) => void;
  handleSearchResults: (results: ISearchResults) => void;
}

export const useSearchResults = (): UseSearchResults => {
  const {
    quantity: moviesQuantity,
    currentPage: currentMoviesPage,
    currentTiles: currentMovies,
    handleShowMore: handleShowMoreMovies,
    initPagination: initMoviesPagination,
  } = useTilesShowMore();

  const {
    quantity: tvsQuantity,
    currentPage: currentTvsPage,
    currentTiles: currentTvs,
    handleShowMore: handleShowMoreTvs,
    initPagination: initTvsPagination,
  } = useTilesShowMore();

  const {
    quantity: personsQuantity,
    currentPage: currentPersonsPage,
    currentTiles: currentPersons,
    handleShowMore: handleShowMorePersons,
    initPagination: initPersonsPagination,
  } = useTilesShowMore();

  const handleShowMore = (type: string) => {
    switch (type) {
      case "movies":
        handleShowMoreMovies();
        break;
      case "tvs":
        handleShowMoreTvs();
        break;
      case "persons":
        handleShowMorePersons();
        break;
      default:
        break;
    }
  };

  const handleSearchResults = (results: ISearchResults) => {
    initMoviesPagination(results.movies);
    initTvsPagination(results.tvs);
    initPersonsPagination(results.persons);
  };

  return {
    movies: {
      qty: {
        tiles: moviesQuantity.tiles,
        pages: moviesQuantity.pages,
      },
      currentPage: currentMoviesPage,
      currentTiles: currentMovies,
    },
    tvs: {
      qty: {
        tiles: tvsQuantity.tiles,
        pages: tvsQuantity.pages,
      },
      currentPage: currentTvsPage,
      currentTiles: currentTvs,
    },
    persons: {
      qty: {
        tiles: personsQuantity.tiles,
        pages: personsQuantity.pages,
      },
      currentPage: currentPersonsPage,
      currentTiles: currentPersons,
    },
    handleSearchResults,
    handleShowMore,
  };
};
