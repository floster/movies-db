import { FC } from 'react'

import { formatSearchTerm } from '../../utils/formatters'

import SvgIcon from './SvgIcon'

interface Props {
  term: string
}

const TorrentSearch: FC<Props> = ({ term }) => {
  const _term = `nm=${formatSearchTerm(term)}`
  const url = `${import.meta.env.VITE_TOLOKA_BASE}?${_term}`
  const title = `search Toloka for ${term}`

  return (
    <a
      href={url.toString()}
      className="torrent-search"
      title={title}
      target="_blank">
      <SvgIcon icon="torrent" />
    </a>
  )
}

export default TorrentSearch
