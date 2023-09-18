import { FC } from "react"
import SvgIcon from "./SvgIcon"
import { formatSearchTerm } from "../js/formatters"
interface TorrentSearchProps {
    term: string
}

const TorrentSearch: FC<TorrentSearchProps> = ({ term }) => {
    const _term = `nm=${formatSearchTerm(term)}`;
    const url = `${import.meta.env.VITE_TOLOKA_BASE}?${_term}`;
    const title = `search Toloka for ${term}`;

    return (
        <a href={url.toString()} className="torrent-search" title={title} target="_blank">
            <SvgIcon icon="torrent" />
        </a>
    )
}

export default TorrentSearch