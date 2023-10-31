import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/store'

import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { favoritesActions } from '../store/slices/favorites.slice'
import { dialogActions } from '../store/slices/dialog.slice'
import { localeActions } from '../store/slices/locale.slice'

/**
 * A custom hook that wraps the `useSelector` hook from `react-redux` and is used to type the `RootState`.
 * @template TState The type of the state held by the Redux store.
 * @template TSelected The type of the value returned by the selector function.
 * @param {(state: TState) => TSelected} selector A function that takes the Redux state and returns the selected state.
 * @returns {TSelected} The selected state.
 * @example const favorites = useAppSelector(state => state.favorites)
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const actions = {
  ...favoritesActions,
  ...dialogActions,
  ...localeActions,
}

/**
 * A custom hook that wraps the `useDispatch` hook from `react-redux` and binds the action creators to the dispatch function.
 * @returns {Record<string, Function>} An object containing the bound action creators.
 * @example const { addToFav, removeFromFavs, toggleFav } = useAppActions();
 */
export const useAppActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
