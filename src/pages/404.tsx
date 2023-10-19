import { useDocumentTitle } from 'usehooks-ts'

const NoMatch: React.FC = () => {
  useDocumentTitle('404 - Movies DB')

  return <div>404</div>
}

export default NoMatch
