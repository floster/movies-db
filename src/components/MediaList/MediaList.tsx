import { ITile } from '../../types/tmdb.models'
import AppTile from '../Tile'

interface Props {
  media: ITile[] | []
}

const MediaList: React.FC<Props> = ({ media }) => {
  return (
    <div className="media-list l-media_list" role="list">
      {media.map(item => (
        <AppTile tile={item as ITile} key={item.id} isRow={true} />
      ))}
    </div>
  )
}

export default MediaList
