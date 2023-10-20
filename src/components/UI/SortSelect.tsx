import { useState } from 'react'
import { SORT_OPTIONS } from '../../config'
import { IAvailableSortValues } from '../../types/tmdb.models'
import { useSectionSort } from '../Layout/TilesGrid'

export interface ISelectProps {
  disabled?: boolean
}

export const SortSelect: React.FC<ISelectProps> = ({ disabled = false }) => {
  const { currentSort, onSortChange } = useSectionSort()

  const [currentOption, setCurrentOption] = useState(currentSort)

  const handleOptionChange = (option: IAvailableSortValues) => {
    setCurrentOption(option)
    onSortChange(option)
  }

  return (
    <div className="app-select">
      <select
        value={currentOption}
        onChange={e =>
          handleOptionChange(e.target.value as IAvailableSortValues)
        }
        disabled={disabled}>
        {SORT_OPTIONS.map(option => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}
export default SortSelect
