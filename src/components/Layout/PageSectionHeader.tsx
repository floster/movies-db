import { SORT_OPTIONS } from '../../config'
import Select from '../UI/Select'

export type ISelectProps = {
  disabled?: boolean
  currentSortOption?: string
  onSortChange?: (option: string) => void
}

interface Props {
  title?: string
  align?: 'start' | 'center' | 'end'
  select?: ISelectProps | null
}

const PageSectionHeader: React.FC<Props> = ({
  title,
  align,
  select = null,
}) => (
  <header
    className={`page-section__header ${
      align === 'start'
        ? 'm-align_start'
        : align === 'center'
        ? 'm-align_center'
        : ''
    }`}>
    <h2 className="page-section__title">{title}</h2>
    {select && (
      <Select
        options={SORT_OPTIONS}
        currentOption={select.currentSortOption!}
        optionChanged={select.onSortChange!}
        label="Sort by:"
        disabled={select.disabled}
      />
    )}
  </header>
)

export default PageSectionHeader
