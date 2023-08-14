import { ITileData } from '../types/tmdb.types'
import AppTile from "./AppTile";

interface Props {
    movies: ITileData[] | [];
}

export default function MoviesList({ movies }: Props) {
    return (
        <div className="movies-list l-movies_list" role="list">
            {movies.map((movie) => <AppTile tile={movie} key={movie.id} isRow={true} />)}
        </div>
    )
}