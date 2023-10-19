import { SORT_OPTIONS } from '../config/'
import AppSelect from './UI/Select'

type Select = {
  disabled?: boolean
  currentSortOption?: string
  onSortChange?: (option: string) => void
}

interface Props {
  title: string
  alignStart?: boolean
  select?: Select | null
}

const AppSectionHeader: React.FC<Props> = ({
  title,
  alignStart,
  // TODO: make next props as an object | null
  select = null,
}) => (
  <header
    className={`app-section__header ${alignStart ? 'm-align_start' : ''}`}>
    <h2 className="app-section__title">{title}</h2>
    {select && (
      <AppSelect
        options={SORT_OPTIONS}
        currentOption={select.currentSortOption!}
        optionChanged={select.onSortChange!}
        label="Sort by:"
        disabled={select.disabled}
      />
    )}
  </header>
)

export default AppSectionHeader
