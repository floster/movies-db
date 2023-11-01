import { useState } from 'react'
import { ETilesQty } from '../types/tmdb.models'

const defaultSortOption = import.meta.env.VITE_DEFAULT_SORT_OPTION as ETilesQty

interface UseSortOption {
  currentSortOption: ETilesQty
  onSortChange: (option: string) => void
}

/**
 * Hook that manages the current sort option.
 * than returned options could be spreaded directly into PageSection component
 * @returns {Object} An object containing the current sort option and a function to update it.
 */
export const useSortOption = (): UseSortOption => {
  const [currentSortOption, setCurrentSortOption] = useState(
    defaultSortOption as ETilesQty
  )

  /**
   * Function to update the current sort option.
   * @param {string} option - The new sort option.
   * @returns {void}
   */
  const onSortChange = (option: string): void =>
    setCurrentSortOption(option as ETilesQty)

  return {
    currentSortOption,
    onSortChange,
  }
}
