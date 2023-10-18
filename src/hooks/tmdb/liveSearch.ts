const DEBOUNCE_DELAY = 500
const MIN_SEARCH_TERM_LENGTH = 4

import { useEffect, useState } from 'react'
import { useSearchCollectionQuery } from '../../store/tmdb/tmdb.api'
import { useDebounce } from '../debounce'

/**
 * A custom hook that manages the live search state.
 * @param {string} term The search term.
 * @returns {{ isLoading: boolean, isError: boolean, data: any, enough: boolean }} An object containing the loading state, the error state, the data and a boolean indicating if there are enough symbols to show the dropdown.
 */
export const useLiveSearch = (term: string) => {
  // enough - is there enough symbols to show dropdown
  const [enough, setEnough] = useState(false)
  const debounced = useDebounce(term, DEBOUNCE_DELAY)

  const { isLoading, isError, data } = useSearchCollectionQuery(debounced, {
    skip: debounced.length < MIN_SEARCH_TERM_LENGTH,
  })

  // show/hide dropdown if there's a data and debounced > 3 symbols
  useEffect(
    () => setEnough(debounced.length >= MIN_SEARCH_TERM_LENGTH ? true : false),
    [data, debounced]
  )

  return { isLoading, isError, data, enough }
}
