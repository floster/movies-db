import AppSelectCustom from './AppSelectCustom'
import MoviesList from './MoviesList'
import { useEffect, useState } from 'react'
import tmdb from '../js/tmdb'
import { OPTIONS_MOVIE_LIST } from '../js/config'
import { MovieListTypes, Movie } from '../js/types'

export default function MainPageSidebar() {
    const [currentListType, setCurrentListType] = useState<MovieListTypes>(OPTIONS_MOVIE_LIST[0].value); // ['popular', 'top_rated', 'upcoming', 'now_playing']
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => { getList(); }, []);

    useEffect(() => {
        console.log('currentListType changed', currentListType)
        getList()
    }, [currentListType]);

    const onListTypeChange = (value: MovieListTypes) => {
        setCurrentListType(value);
    }

    const getList = async () => {
        const listData = await tmdb.getMoviesList(1, currentListType);
        setMovies(listData.movies);
    }

    return (
        <aside className="sidebar">
            <AppSelectCustom onListTypeChange={onListTypeChange} currentListType={currentListType} />
            <MoviesList movies={movies} listType={currentListType} />
        </aside>
    )
}
