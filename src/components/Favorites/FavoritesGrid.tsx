import useGetTilesData from '../../hooks/tmdb/getTilesData'
import { IAvailableFavoritesTypes } from '../../types/tmdb.models'
import TilesGrid from '../Layout/TilesGrid'
import Error from '../UI/Error'
import Spinner from '../UI/Spinner'

type Props = {
  ids: number[]
  type: IAvailableFavoritesTypes
}

const FavoritesGrid: React.FC<Props> = ({ ids, type }) => {
  const { tiles, isError, isLoading } = useGetTilesData(type, ids)

  return isError ? (
    <Error error={`Error occured while getting #${type}s favorites data`} />
  ) : isLoading ? (
    <Spinner />
  ) : (
    <TilesGrid tiles={tiles} type={type} />
  )
}

export default FavoritesGrid
