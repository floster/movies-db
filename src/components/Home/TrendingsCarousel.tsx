import AppError from '../UI/Error'
import AppTile from '../Tile'
import AppSpinner from '../UI/Spinner'

import { useGetTrendingsQuery } from '../../store/api/tmdb.api'
import { IAvailableTrendingAndSearchMultiTypes } from '../../types/tmdb.models'

interface Props {
  itemsType: IAvailableTrendingAndSearchMultiTypes
}

const TrendingsCarousel: React.FC<Props> = ({ itemsType }) => {
  const { data, isError, isLoading } = useGetTrendingsQuery(itemsType)

  if (!data && !isLoading) return null

  return isError ? (
    <AppError error={`Error occured while fetching trending ${itemsType}s`} />
  ) : (
    <div className="app-carousel has-scroll">
      {isLoading ? (
        <AppSpinner visible={true} />
      ) : (
        <div className="app-carousel__track">
          {data.map(item => (
            <AppTile tile={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingsCarousel
