import { Part, ListTypes } from '../js/types'
import AppTile from "./AppTile";

interface Props {
    movies: Part[] | [];
    listType: ListTypes;
}

export default function MoviesList({ movies, listType }: Props) {
    return (
        <div className="movies-list l-movies_list" role="list">
            {movies.map((movie) => <AppTile tile={movie} key={movie.id} isRow={true} listType={listType} />)}
        </div>
    )
}