import { Part } from "../data.types";
import MovieRow from "./MovieRow";

interface Props {
    movies: Part[];
}

export default function MoviesList({ movies }: Props) {
    return (
        <div className="movies-list l-movies_list" role="list">
            {movies.map((movie) => <MovieRow movie={movie} key={movie.id} />)}
        </div>
    )
}