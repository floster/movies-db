import { COLLECTIONS } from '../../config/dummy'
import MediaHero from '../MediaHero'

export default function RandomMedia() {
  const id = COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)]

  return (
    <div className="random-media">
      <MediaHero type="collection" id={id} withLink={true} />
    </div>
  )
}
