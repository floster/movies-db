import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'

import { useGetCollectionQuery } from '../store/api/tmdb.api'
import TilesGrid from '../components/Layout/TilesGrid'

type CollectionParams = {
  id: string
}

const Collection: React.FC = () => {
  const params = useParams<CollectionParams>()
  const collectionId = getIdFromLink(params.id!)

  const { data, isError, isLoading } = useGetCollectionQuery(collectionId)

  return (
    <>
      <MediaHero id={collectionId} type="collection" />
      <div className="l-content container">
        {isError ? (
          <Error
            error={`Error occured while fetching collection #${collectionId} parts`}
          />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <TilesGrid
            tiles={data?.parts ? data.parts : []}
            type={'collection'}
            title="parts"
          />
        )}
      </div>
    </>
  )
}

export default Collection
