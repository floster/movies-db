import { COLLECTIONS } from '../../config/dummy'
import MediaHero from '../MediaHero'

const RandomMedia: React.FC = () => {
  const id = COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)]

  return (
    <div className="random-media">
      <MediaHero type="collection" id={id} withLink={true} />
    </div>
  )
}

export default RandomMedia
