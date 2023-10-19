import { IAvailableFavoritesTypes } from '../../types/tmdb.models'

type Props = {
  type: IAvailableFavoritesTypes
  id?: string
  children: React.ReactNode
}

const TilesLayout: React.FC<Props> = ({ type, id = '', children }) => (
  <div className={`tiles-layout m-${type}`} id={id}>
    {children}
  </div>
)

export default TilesLayout
