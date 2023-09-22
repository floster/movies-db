import { ISearchResults, ITileData } from "../types/tmdb.types";
import { useTilesPagination } from './useTilesPagination'

type UseSearchResultsItem = {
    qty: {
        tiles: number,
        pages: number,
    },
    currentPage: number,
    currentTiles: ITileData[],
}
interface UseSearchResults {
    movies: UseSearchResultsItem,
    tvs: UseSearchResultsItem,
    persons: UseSearchResultsItem,
    handleShowMore: (type: string) => void,
    handleSearchResults: (results: ISearchResults) => void,
}

export const useSearchResults = (): UseSearchResults => {
    const {
        quantity: moviesQuantity,
        currentPage: currentMoviesPage,
        currentTiles: currentMovies,
        handleShowMore: handleShowMoreMovies,
        initPagination: initMoviesPagination
    } = useTilesPagination();

    const {
        quantity: tvsQuantity,
        currentPage: currentTvsPage,
        currentTiles: currentTvs,
        handleShowMore: handleShowMoreTvs,
        initPagination: initTvsPagination
    } = useTilesPagination();

    const {
        quantity: personsQuantity,
        currentPage: currentPersonsPage,
        currentTiles: currentPersons,
        handleShowMore: handleShowMorePersons,
        initPagination: initPersonsPagination
    } = useTilesPagination();

    const handleShowMore = (type: string) => {
        switch (type) {
            case 'movies':
                handleShowMoreMovies();
                break;
            case 'tvs':
                handleShowMoreTvs();
                break;
            case 'persons':
                handleShowMorePersons();
                break;
            default:
                break;
        }
    }

    const handleSearchResults = (results: ISearchResults) => {
        initMoviesPagination(results.movies);
        initTvsPagination(results.tvs);
        initPersonsPagination(results.persons);
    }

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
        handleShowMore
    };
}