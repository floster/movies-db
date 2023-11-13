import { useState } from 'react'
import { COLLECTIONS } from '../../config/collections'
import { EMediaTypes } from '../../types/tmdb.models'
import MediaHero from '../MediaHero/MediaHero'

const RandomMedia: React.FC = () => {
  const generateRandomID = () =>
    COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)]

  const [collectionID, setCollectionID] = useState<number>(() =>
    generateRandomID()
  )

  const generateNewID = () => setCollectionID(generateRandomID())

  return (
    <div className="random-media" onClick={generateNewID}>
      <MediaHero
        type={EMediaTypes.Collection}
        id={collectionID}
        withLink={true}
      />
    </div>
  )
}

export default RandomMedia
