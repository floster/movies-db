import SvgIcon from './SvgIcon'

interface Props {
  term: string
}

const WikiPage: React.FC<Props> = ({ term }) => {
  const _term = term.replace(/\s/g, '_')
  const url = `${import.meta.env.VITE_WIKIPEDIA_BASE}/${_term}`
  const title = `Go to ${term}'s wikipedia page`

  return (
    <a
      href={url.toString()}
      onClick={e => e.stopPropagation()}
      className="wiki-page"
      title={title}
      target="_blank"
      rel="noreferrer">
      <SvgIcon icon="wikipedia" />
    </a>
  )
}

export default WikiPage
