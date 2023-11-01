import { ChangeEvent, useState } from 'react'
import { SelectOption } from '../../../config'
import { ELocales, ESortValues, ETilesQty } from '../../../types/tmdb.models'

type AppSelectProps<T extends ESortValues | ETilesQty | ELocales> = {
  defaultValue: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
  extraClass?: string
}

const AppSelect = <T extends ESortValues | ETilesQty | ELocales>({
  defaultValue,
  options,
  onChange,
  disabled = false,
  extraClass,
}: AppSelectProps<T>) => {
  const [currentOption, setCurrentOption] = useState(defaultValue)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as T
    setCurrentOption(value)
    onChange(value)
  }

  return (
    <div className={`app-select ${extraClass ? extraClass : ''}`}>
      <select
        disabled={disabled}
        value={currentOption}
        onChange={e => handleChange(e)}>
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}
export default AppSelect
