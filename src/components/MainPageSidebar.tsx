import AppSelectCustom from './AppSelectCustom'
import MoviesList from './MoviesList'
import { useCallback, useEffect, useState } from 'react'
import tmdb from '../js/tmdb-api'
import { OPTIONS_MOVIE_LIST } from '../js/config'
import { UListTypes, ITileData } from '../types/tmdb.types'
import { formatTilesData } from '../js/helpers'

export default function MainPageSidebar() {
    const [currentListType, setCurrentListType] = useState<UListTypes>(OPTIONS_MOVIE_LIST[0].value); // ['popular', 'top_rated', 'upcoming', 'now_playing']
    const [movies, setMovies] = useState<ITileData[]>([]);

    const getList = useCallback(async () => {
        const listData = await tmdb.getMoviesList(1, currentListType);
        setMovies(formatTilesData(listData.movies, 'movie', 'released', false, true));
    }, [currentListType])

    useEffect(() => {
        async function fetchData() {
            await getList();
        }
        fetchData();
    }, [getList]);

    useEffect(() => {
        async function fetchData() {
            await getList();
        }
        fetchData();
    }, [currentListType, getList]);

    const onListTypeChange = (value: UListTypes) => {
        setCurrentListType(value);
    }

    return (
        <aside className="sidebar">
            <AppSelectCustom onListTypeChange={onListTypeChange} currentListType={currentListType} />
            <MoviesList movies={movies} />
        </aside>
    )
}
