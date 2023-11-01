import { useState } from 'react'
import { TILES_QTY_OPTIONS } from '../../../config'
import { ETilesQty } from '../../../types/tmdb.models'
import { useSectionQtyCtx } from '../../Layout/TilesGrid'
import AppSelect from './AppSelect'

export const SelectQty: React.FC = () => {
  const { currentQty, onQtyChange, disabled } = useSectionQtyCtx()

  const [currentOption, setCurrentOption] = useState(currentQty)

  const handleOptionChange = (value: ETilesQty) => {
    setCurrentOption(value)
    onQtyChange(value)
  }

  return (
    <AppSelect<ETilesQty>
      disabled={disabled}
      defaultValue={currentOption}
      onChange={handleOptionChange}
      options={TILES_QTY_OPTIONS}
    />
  )
}
export default SelectQty
