import { useEffect, useState } from "react";
import { ISearchResults, ITileData } from "../types/tmdb.types";
import { getTiles } from "../js/helpers";

const TILES_QTY_TO_SHOW = +import.meta.env.VITE_TILES_QTY_TO_SHOW as number;

export const useSearchResults = () => {
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

    const handleSearchResults = (results: ISearchResults) => {
        setQuantity(calcQuantity(results))
        setMovies(results.movies);
        setTvs(results.tvs);
        setPersons(results.persons);
        setCurrentMovies(getTiles(results.movies, 0, calcTilesQtyToShow('movies')));
        setCurrentTvs(getTiles(results.tvs, 0, calcTilesQtyToShow('tvs')));
        setCurrentPersons(getTiles(results.persons, 0, calcTilesQtyToShow('persons')));
    }

    return { quantity, currentMovies, currentTvs, currentPersons, currentMoviesPage, currentTvsPage, currentPersonsPage, handleShowMore, handleSearchResults };
}