import { COLLECTIONS } from '../../config/dummy'
import { EMediaTypes } from '../../types/tmdb.models'
import MediaHero from '../MediaHero'

const RandomMedia: React.FC = () => {
  const id = COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)]

  return (
    <div className="random-media">
      <MediaHero type={EMediaTypes.Collection} id={id} withLink={true} />
    </div>
  )
}

export default RandomMedia
