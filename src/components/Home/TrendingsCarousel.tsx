import Error from '../UI/Error'
import Tile from '../Tile'
import Spinner from '../UI/Spinner'

import { useGetTrendingsQuery } from '../../store/api/tmdb.api'
import { IAvailableTrendingAndSearchMultiTypes } from '../../types/tmdb.models'

interface Props {
  itemsType: IAvailableTrendingAndSearchMultiTypes
}

const TrendingsCarousel: React.FC<Props> = ({ itemsType }) => {
  const { data, isError, isLoading } = useGetTrendingsQuery(itemsType)

  if (!data && !isLoading) return null

  return isError ? (
    <Error error={`Error occured while fetching trending ${itemsType}s`} />
  ) : (
    <div className="app-carousel has-scroll">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="app-carousel__track">
          {data.map(item => (
            <Tile tile={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingsCarousel
