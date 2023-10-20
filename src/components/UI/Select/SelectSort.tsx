import { useState } from 'react'
import { SORT_OPTIONS } from '../../../config'
import { IAvailableSortValues } from '../../../types/tmdb.models'
import { useSectionSortCtx } from '../../Layout/TilesGrid'
import Select from './Select'

export interface ISelectProps {
  disabled?: boolean
}

export const SortSelect: React.FC<ISelectProps> = ({ disabled = false }) => {
  const { currentSort, onSortChange } = useSectionSortCtx()

  const [currentOption, setCurrentOption] = useState(currentSort)

  const handleOptionChange = (option: IAvailableSortValues) => {
    setCurrentOption(option)
    onSortChange(option)
  }

  return (
    <div className="app-select">
      <Select
        disabled={disabled}
        defaultValue={currentOption}
        onChange={handleOptionChange}
        options={SORT_OPTIONS}
      />
    </div>
  )
}
export default SortSelect
