import { useState } from 'react'
import { SORT_OPTIONS } from '../../../config'
import { IAvailableSortValues } from '../../../types/tmdb.models'
import { useSectionSortCtx } from '../../Layout/TilesGrid'
import Select from './Select'

export const SortSelect: React.FC = () => {
  const { currentSort, onSortChange, disabled } = useSectionSortCtx()

  const [currentOption, setCurrentOption] = useState(currentSort)

  const handleOptionChange = (option: IAvailableSortValues) => {
    setCurrentOption(option)
    onSortChange(option)
  }

  return (
    <Select
      disabled={disabled}
      defaultValue={currentOption}
      onChange={handleOptionChange}
      options={SORT_OPTIONS}
    />
  )
}
export default SortSelect
