interface Props {
  children: React.ReactNode
  extraClass?: string
}

const AppSection: React.FC<Props> = ({ children, extraClass }) => (
  <section className={`app-section ${extraClass || ''}`}>{children}</section>
)

export default AppSection
