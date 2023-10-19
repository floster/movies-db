import { useState } from 'react'
import { IAvailableSortValues } from '../types/tmdb.models'

const defaultSortOption = import.meta.env
  .VITE_DEFAULT_SORT_OPTION as IAvailableSortValues

interface UseSortOption {
  currentSortOption: IAvailableSortValues
  onSortChange: (option: string) => void
}

/**
 * Hook that manages the current sort option.
 * than returned options could be spreaded directly into AppSectionHeader component
 * @returns {Object} An object containing the current sort option and a function to update it.
 */
export const useSortOption = (): UseSortOption => {
  const [currentSortOption, setCurrentSortOption] = useState(
    defaultSortOption as IAvailableSortValues
  )

  /**
   * Function to update the current sort option.
   * @param {string} option - The new sort option.
   * @returns {void}
   */
  const onSortChange = (option: string): void =>
    setCurrentSortOption(option as IAvailableSortValues)

  return {
    currentSortOption,
    onSortChange,
  }
}
