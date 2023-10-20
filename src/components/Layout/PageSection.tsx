import PageSectionHeader from './PageSectionHeader'

interface Props {
  children: React.ReactNode
  extraClass?: string
  align?: 'start' | 'center' | 'end'
  title?: string
}

const PageSection: React.FC<Props> = ({
  children,
  extraClass,
  title,
  align = 'end',
}) => (
  <section className={`page-section ${extraClass || ''}`}>
    {title && (
      <PageSectionHeader title={title} align={align} hasSort hasTilesQty />
    )}
    <section className={`page-section__inner`}>{children}</section>
  </section>
)

export default PageSection
