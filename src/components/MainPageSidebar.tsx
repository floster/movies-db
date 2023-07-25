import { AppSelectCustom } from './AppSelectCustom'
import { MoviesList } from './MoviesList'
import { Part } from '../data.types'

export const MainPageSidebar = (props: { movies: Part[] }) => {
    return (
        <aside className="sidebar">
            <AppSelectCustom />
            <MoviesList movies={props.movies} />
        </aside>
    )
}