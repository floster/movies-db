import PageSectionHeader, { ISelectProps } from './PageSectionHeader'

interface Props {
  children: React.ReactNode
  extraClass?: string
  align?: 'start' | 'center' | 'end'
  title?: string
  select?: ISelectProps | null
}

const PageSection: React.FC<Props> = ({
  children,
  extraClass,
  title,
  select,
  align = 'end',
}) => (
  <section className={`page-section ${extraClass || ''}`}>
    {(title || select) && (
      <PageSectionHeader title={title} select={select} align={align} />
    )}
    <section className={`page-section__inner`}>{children}</section>
  </section>
)

export default PageSection
