import { Part } from "../data.types";
import { MovieRow } from "./MovieRow";

export const MoviesList = (props: { movies: Part[] }) => {
    const movies = props.movies;

    return (
        <div className="movies-list l-movies_list" role="list">
            {movies.map((movie) => <MovieRow movie={movie} />)}
        </div>
    )
}