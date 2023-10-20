import { useState } from 'react'
import { TILES_QTY_OPTIONS } from '../../../config'
import { IAvailableTilesQtyValues } from '../../../types/tmdb.models'
import { useSectionQtyCtx } from '../../Layout/TilesGrid'
import Select from './Select'

export const QtySelect: React.FC = () => {
  const { currentQty, onQtyChange } = useSectionQtyCtx()

  const [currentOption, setCurrentOption] = useState(currentQty)

  const handleOptionChange = (option: IAvailableTilesQtyValues) => {
    setCurrentOption(option)
    onQtyChange(option)
  }

  return (
    <Select
      defaultValue={currentOption}
      onChange={handleOptionChange}
      options={TILES_QTY_OPTIONS}
    />
  )
}
export default QtySelect
