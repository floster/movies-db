import { formatSearchTerm } from '../../utils/formatters'

import SvgIcon from './SvgIcon'

interface Props {
  term: string
}

const TorrentSearch: React.FC<Props> = ({ term }) => {
  const _term = `nm=${formatSearchTerm(term)}`
  const url = `${import.meta.env.VITE_TOLOKA_BASE}?${_term}`
  const title = `search Toloka for ${term}`

  return (
    <a
      href={url.toString()}
      onClick={e => e.stopPropagation()}
      className="torrent-search"
      title={title}
      target="_blank"
      rel="noreferrer">
      <SvgIcon icon="torrent" />
    </a>
  )
}

export default TorrentSearch
