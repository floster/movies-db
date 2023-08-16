import { ITileData } from '../types/tmdb.types'
import AppTile from "./AppTile";

interface Props {
    media: ITileData[] | [];
}

export default function MediaList({ media }: Props) {
    return (
        <div className="movies-list l-media_list" role="list">
            {media.map((item) => <AppTile tile={item} key={item.id} isRow={true} />)}
        </div>
    )
}