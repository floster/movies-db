import { AppFavorite } from "./AppFavorite"
import { Part } from "../data.types"

export const MovieRow = (props: { movie: Part }) => {
    const movie = props.movie;
    return (
        <a href="movie.html" className="movie-row" role="listitem" aria-label={movie.title}>
            <img className="movie-row__img" src={`./src/assets/poster_${movie.id}.png`} alt={`${movie.title} poster`} />
            <div className="movie-row__content">
                <h3 className="movie-row__title">{movie.title}</h3>
                <p className="movie-row__label">{movie.label}</p>
            </div>

            <AppFavorite checked={movie.favorite} />
        </a>
    )
}