import SelectQty from '../UI/Select/SelectQty'
import SelectSort from '../UI/Select/SelectSort'

interface Props {
  title?: string
  align?: 'start' | 'center' | 'end'
  hasSort?: boolean
  hasQty?: boolean
}

const PageSectionHeader: React.FC<Props> = ({
  title,
  align,
  hasSort = false,
  hasQty = true,
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
    {hasSort && <SelectSort />}
    {hasQty && <SelectQty />}
  </header>
)

export default PageSectionHeader
