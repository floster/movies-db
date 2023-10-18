import { SORT_OPTIONS } from '../config/'
import AppSelect from './UI/AppSelect'

interface Props {
  title: string
  hasSelect?: boolean
  selectDisabled?: boolean
  currentSortOption?: string
  onSortChange?: (option: string) => void
  alignStart?: boolean
}

export default function AppSectionHeader({
  title,
  hasSelect,
  selectDisabled,
  alignStart,
  currentSortOption,
  onSortChange,
}: Props) {
  return (
    <header
      className={`app-section__header ${alignStart ? 'm-align_start' : ''}`}>
      <h2 className="app-section__title">{title}</h2>
      {hasSelect && (
        <AppSelect
          options={SORT_OPTIONS}
          currentOption={currentSortOption!}
          optionChanged={onSortChange!}
          label="Sort by:"
          disabled={selectDisabled}
        />
      )}
    </header>
  )
}
