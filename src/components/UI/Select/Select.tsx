import { useState } from 'react'
import { SelectOption } from '../../../config'

interface Props<T> {
  disabled?: boolean
  defaultValue: T
  options: SelectOption<T>[]
  onChange: (option: T) => void
  extraClass?: string
}

export const Select = <ValueType extends string>({
  defaultValue,
  options,
  onChange,
  disabled = false,
  extraClass,
}: Props<ValueType>) => {
  const [currentOption, setCurrentOption] = useState(defaultValue)

  const handleChange = (option: ValueType) => {
    setCurrentOption(option)
    onChange(option)
  }

  return (
    <div className={`app-select ${extraClass ? extraClass : ''}`}>
      <select
        disabled={disabled}
        value={currentOption}
        onChange={e => handleChange(e.target.value as ValueType)}>
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
