import PageSectionHeader, { ISelectProps } from './PageSectionHeader'

interface Props {
  children: React.ReactNode
  extraClass?: string
  align?: 'start' | 'center' | 'end'
  title: string
  select?: ISelectProps | null
}

const PageSection: React.FC<Props> = ({
  children,
  extraClass,
  title,
  select,
  align = 'start',
}) => (
  <>
    <PageSectionHeader title={title} select={select} align={align} />
    <section className={`app-section ${extraClass || ''}`}>{children}</section>
  </>
)

export default PageSection
