import SvgIcon from '../UI/SvgIcon'
import { AVAILABLE_LIST_OPTIONS } from '../../config/dummy'
import { IAvailableListsOptions } from '../../types/tmdb.models'

interface Props {
  currentListType: IAvailableListsOptions
  onListTypeChange: (value: IAvailableListsOptions) => void
}

export default function MediaListSelect({
  onListTypeChange,
  currentListType,
}: Props) {
  return (
    <div className="app-select m-huge" aria-labelledby="moviesTypeSelect">
      <span className="app-select__arrow" aria-hidden="true">
        <SvgIcon icon="chevron_down" />
      </span>
      <select
        name="media type"
        id="mediaTypeSelect"
        aria-label={`current media type ${currentListType
          .replace(':', ' ')
          .replace('_', ' ')}`}
        value={currentListType}
        onChange={e =>
          onListTypeChange(e.target.value as IAvailableListsOptions)
        }>
        {AVAILABLE_LIST_OPTIONS.map(option => (
          <option value={option} key={option}>
            {option.replace(':', '\\').replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
