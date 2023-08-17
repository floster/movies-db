import { FC } from "react"
import SvgIcon from "./SvgIcon"
import { TOLOKA_BASE } from "../js/config"
import { formatSearchTerm } from "../js/helpers"
interface TorrentSearchProps {
    term: string
}

const TorrentSearch: FC<TorrentSearchProps> = ({ term }) => {
    const _term = `nm=${formatSearchTerm(term)}`;
    const url = `${TOLOKA_BASE}?${_term}`;
    const title = `search Toloka for ${term}`;

    return (
        <a href={url.toString()} className="torrent-search" title={title} target="_blank">
            <SvgIcon icon="torrent" />
        </a>
    )
}

export default TorrentSearch