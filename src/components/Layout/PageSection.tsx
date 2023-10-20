import PageSectionHeader from './PageSectionHeader'

interface Props {
  children: React.ReactNode
  extraClass?: string
  align?: 'start' | 'center' | 'end'
  title?: string
  hasSort?: boolean
  hasQty?: boolean
}

const PageSection: React.FC<Props> = ({
  children,
  extraClass,
  title,
  align = 'end',
  hasSort = false,
  hasQty = false,
}) => (
  <section className={`page-section ${extraClass || ''}`}>
    {title && (
      <PageSectionHeader
        title={title}
        align={align}
        hasSort={hasSort}
        hasQty={hasQty}
      />
    )}
    <section className={`page-section__inner`}>{children}</section>
  </section>
)

export default PageSection
