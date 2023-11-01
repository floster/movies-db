import { useDocumentTitle } from 'usehooks-ts'
import { useAppActions } from '../hooks/useRedux'

const NoMatch: React.FC = () => {
  useDocumentTitle('404 - Movies DB')

  const { openDialog } = useAppActions()

  return (
    <section className="no-match container">
      <h1 className="no-match__title">404</h1>
      <h2 className="no-match__subtitle">Page not found</h2>
      <p className="no-match__buttons">
        <a className="button m-accent" href="/">
          ← back to start
        </a>{' '}
        <button className="button m-primary" onClick={() => openDialog()}>
          search for... ⤴
        </button>
      </p>
    </section>
  )
}

export default NoMatch
