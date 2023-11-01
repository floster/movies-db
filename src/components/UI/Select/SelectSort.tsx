import { useState } from 'react'
import { SORT_OPTIONS } from '../../../config'
import { ESortValues } from '../../../types/tmdb.models'
import { useSectionSortCtx } from '../../Layout/TilesGrid'
import AppSelect from './AppSelect'

export const SortSelect: React.FC = () => {
  const { currentSort, onSortChange, disabled } = useSectionSortCtx()

  const [currentOption, setCurrentOption] = useState(currentSort)

  const handleOptionChange = (option: ESortValues) => {
    setCurrentOption(option)
    onSortChange(option)
  }

  return (
    <AppSelect<ESortValues>
      disabled={disabled}
      defaultValue={currentOption}
      onChange={handleOptionChange}
      options={SORT_OPTIONS}
    />
  )
}
export default SortSelect
