import { useState } from 'react'
import { UTSortValues } from '../types/tmdb.types'

const defaultSortOption = import.meta.env
  .VITE_DEFAULT_SORT_OPTION as UTSortValues

interface UseSortOption {
  currentSortOption: UTSortValues
  onSortChange: (option: string) => void
}

/**
 * Hook that manages the current sort option.
 * @returns {Object} An object containing the current sort option and a function to update it.
 */
export const useSortOption = (): UseSortOption => {
  const [currentSortOption, setCurrentSortOption] = useState(
    defaultSortOption as UTSortValues
  )

  /**
   * Function to update the current sort option.
   * @param {string} option - The new sort option.
   * @returns {void}
   */
  const onSortChange = (option: string): void =>
    setCurrentSortOption(option as UTSortValues)

  return {
    currentSortOption,
    onSortChange,
  }
}
