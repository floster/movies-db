import { useEffect, useMemo, useState } from 'react'
import SvgIcon from './SvgIcon'

import { useAppActions, useAppSelector } from '../../hooks/useRedux'
import { IAvailableFavoritesTypes } from '../../types/tmdb.models'

/**
 * Checks if an item with the given ID is already in the favorites list.
 * @param {number} id - The ID of the item to check.
 * @param {IAvailableFavoritesTypes} type - The type of the item to check.
 * @param {FavoritesState} favorites - The favorites state object.
 * @returns {boolean} Whether the item is already in the favorites list.
 */

interface Props {
  type: IAvailableFavoritesTypes
  id: number
  title: string
}

export default function AppFavorite({ type, id, title }: Props) {
  const { toggle } = useAppActions()
  const favorites = useAppSelector(state => state.favorites)

  const isAlreadyFavorite = useMemo(() => {
    return favorites[type].some(item => item === id)
  }, [favorites, id, type])

  const [checkedState, setCheckedState] = useState(isAlreadyFavorite)

  const handleChange = () => {
    toggle({ type, id })
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
