import { Part, ListTypes } from '../js/types'
import MovieRow from "./MovieRow";

interface Props {
    movies: Part[] | [];
    listType: ListTypes;
}

export default function MoviesList({ movies, listType }: Props) {
    return (
        <div className="movies-list l-movies_list" role="list">
            {movies.map((movie) => <MovieRow movie={movie} key={movie.id} listType={listType} />)}
        </div>
    )
}