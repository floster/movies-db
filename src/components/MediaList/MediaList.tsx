import { useMemo } from 'react'
import { ITile } from '../../types/tmdb.models'
import AppTile from '../Tile'

interface Props {
  media: ITile[] | []
}

const MediaList: React.FC<Props> = ({ media }) => {
  const tiles = useMemo(() => media, [media])

  return (
    <div className="media-list">
      <div className="media-list__inner" role="list">
        {tiles.map(item => (
          <AppTile tile={item as ITile} key={item.id} isRow={true} />
        ))}
      </div>
    </div>
  )
}

export default MediaList
