import { useEffect, useMemo, useState } from 'react'
import SvgIcon from './SvgIcon'

import { useAppActions, useAppSelector } from '../../hooks/useRedux'
import { IAvailableFavoritesTypes } from '../../types/tmdb.models'

interface Props {
  type: IAvailableFavoritesTypes
  id: number
  title: string
}

const FavoriteBtn: React.FC<Props> = ({ type, id, title }) => {
  const { toggleFavorite } = useAppActions()
  const favorites = useAppSelector(state => state.favorites)
  const userId = useAppSelector(state => state.account.account?.id!)

  const isAlreadyFavorite = useMemo(() => {
    return favorites[type].some(item => item === id)
  }, [favorites, id, type])

  const [checkedState, setCheckedState] = useState(isAlreadyFavorite)

  const handleChange = () => {
    toggleFavorite({ type, id, userId })
    setCheckedState(isAlreadyFavorite)
  }

  useEffect(() => {
    setCheckedState(isAlreadyFavorite)
  }, [isAlreadyFavorite])

  return (
    <>
      <label className="app-favorite" aria-label={`add ${title} to favorites`}>
        <input
          type="checkbox"
          name="toggleFavoriteCheckbox"
          checked={checkedState}
          onChange={handleChange}
        />
        <SvgIcon icon="fire" extraClass="m-outline" />
        <SvgIcon icon="fire_solid" extraClass="m-solid" />
      </label>
    </>
  )
}

export default FavoriteBtn
