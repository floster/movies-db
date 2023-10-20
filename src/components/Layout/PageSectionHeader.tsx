import SortSelect from '../UI/SortSelect'

interface Props {
  title?: string
  align?: 'start' | 'center' | 'end'
  hasSort?: boolean
}

const PageSectionHeader: React.FC<Props> = ({
  title,
  align,
  hasSort = false,
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
    {hasSort && <SortSelect />}
  </header>
)

export default PageSectionHeader
