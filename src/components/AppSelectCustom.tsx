import SvgIcon from "./SvgIcon"
import { OPTIONS_MOVIE_LIST } from '../js/config'
import { MovieListTypes } from '../js/types'

interface Props {
    currentListType: MovieListTypes,
    onListTypeChange: (value: MovieListTypes) => void
}

export default function AppSelectCustom({ onListTypeChange, currentListType }: Props) {
    return (
        <div className="app-select m-huge" aria-labelledby="moviesTypeSelect">
            <span className="app-select__arrow" aria-hidden="true">
                <SvgIcon icon="chevron_down" />
            </span>
            <select name="movies type" id="moviesTypeSelect" aria-label="current movies type" value={currentListType} onChange={e => onListTypeChange(e.target.value as MovieListTypes)}>
                {OPTIONS_MOVIE_LIST.map((option) => <option value={option.value} key={option.value}>{option.title.toLowerCase()}</option>)}
            </select>
        </div>
    )
}
