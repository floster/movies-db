import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'

import { useGetCollectionQuery } from '../store/api/tmdb.api'
import TilesGrid from '../components/Layout/TilesGrid'
import { useAppSelector } from '../hooks/useRedux'
import { EMediaTypes, ESortValues } from '../types/tmdb.models'

type CollectionParams = {
  id: string
}

const Collection: React.FC = () => {
  const params = useParams<CollectionParams>()
  const collectionId = getIdFromLink(params.id!)

  const locale = useAppSelector(state => state.locale.current)

  const { data, isError, isLoading } = useGetCollectionQuery({
    id: collectionId,
    locale,
  })

  return (
    <>
      <MediaHero id={collectionId} type={EMediaTypes.Collection} />
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
            type={EMediaTypes.Collection}
            title="parts"
            hasSort={true}
            defaultSort={ESortValues.YearDesc}
            hasQty={true}
          />
        )}
      </div>
    </>
  )
}

export default Collection
