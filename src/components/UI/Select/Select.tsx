import { useState } from 'react'
import { SelectOption } from '../../../config'

interface Props<T> {
  defaultValue: T
  options: SelectOption<T>[]
  onChange: (option: T) => void
}

export const Select = <ValueType extends string>({
  defaultValue,
  options,
  onChange,
}: Props<ValueType>) => {
  const [currentOption, setCurrentOption] = useState(defaultValue)

  const handleChange = (option: ValueType) => {
    setCurrentOption(option)
    onChange(option)
  }

  return (
    <div className="app-select">
      <select
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
