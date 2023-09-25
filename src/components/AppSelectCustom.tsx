import SvgIcon from "./SvgIcon"
import { MOVIE_LIST_OPTIONS } from '../js/config'
import { UTListSortOptions } from '../types/tmdb.types'

interface Props {
    currentListType: UTListSortOptions,
    onListTypeChange: (value: UTListSortOptions) => void
}

export default function AppSelectCustom({ onListTypeChange, currentListType }: Props) {
    return (
        <div className="app-select m-huge" aria-labelledby="moviesTypeSelect">
            <span className="app-select__arrow" aria-hidden="true">
                <SvgIcon icon="chevron_down" />
            </span>
            <select name="movies type" id="moviesTypeSelect" aria-label="current movies type" value={currentListType} onChange={e => onListTypeChange(e.target.value as UTListSortOptions)}>
                {MOVIE_LIST_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.title.toLowerCase()}</option>)}
            </select>
        </div>
    )
}
