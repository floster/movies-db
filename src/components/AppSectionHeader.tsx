import { SORT_OPTIONS } from '../config/'
import AppSelect from './UI/Select'

interface Props {
  title: string
  hasSelect?: boolean
  selectDisabled?: boolean
  currentSortOption?: string
  onSortChange?: (option: string) => void
  alignStart?: boolean
}

const AppSectionHeader: React.FC<Props> = ({
  title,
  alignStart,
  // TODO: make next props as an object | null
  hasSelect,
  selectDisabled,
  currentSortOption,
  onSortChange,
}) => (
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

export default AppSectionHeader
