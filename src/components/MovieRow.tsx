import AppFavorite from "./AppFavorite"
import { Movie, MovieListTypes } from '../js/types'

interface Props {
    movie: Movie;
    listType: MovieListTypes
}

export default function MovieRow({ movie, listType }: Props) {
    return (
        <a href="movie.html" className="movie-row" role="listitem" aria-label={movie.title}>
            <img className="movie-row__img" src={movie.poster} alt={`${movie.title} poster`} />
            <div className="movie-row__content">
                <h3 className="movie-row__title">{movie.title}</h3>
                <p className="movie-row__label">{movie.released.date}{listType !== 'upcoming' ? ', ' + movie.released.year : ''}</p>
                {/* {listType !== 'upcoming' && <span className="movie-row__rating">{movie.rating} / {movie.votes} votes</span>} */}
            </div>

            <AppFavorite checked={false} title={movie.title} />
        </a>
    )
}