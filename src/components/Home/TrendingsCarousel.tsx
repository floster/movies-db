import Error from '../UI/Error'
import Tile from '../Tile'
import Spinner from '../UI/Spinner'

import { useGetTrendingsQuery } from '../../store/api/tmdb.api'
import { IAvailableTrendingsTypes } from '../../types/tmdb.models'
import { useAppSelector } from '../../hooks/useRedux'

interface Props {
  type: IAvailableTrendingsTypes
}

const TrendingsCarousel: React.FC<Props> = ({ type }) => {
  const locale = useAppSelector(state => state.locale.current)

  const { data, isError, isLoading } = useGetTrendingsQuery({ type, locale })

  if (!data && !isLoading) return null

  return isError ? (
    <Error error={`Error occured while fetching trending ${type}s`} />
  ) : (
    <div className="app-carousel has-scroll">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="app-carousel__track">
          {data.map((item, idx) => (
            <Tile tile={item} key={item.id + idx} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TrendingsCarousel
