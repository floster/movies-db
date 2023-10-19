import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { formatSearchTerm } from '../../utils/formatters'

import AppError from '../UI/AppError'
import AppSpinner from '../UI/AppSpinner'
import { SearchForm } from '../SearchForm'
import { QuickSearchHits } from './QuickSearchHits'

import useSearch from '../../hooks/search/search'
import { useAppActions } from '../../hooks/useRedux'

export default function QuickSearchForm() {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const { closeDialog } = useAppActions()

  const handleSearchSubmit = (searchTerm: string) => {
    // hide search dialog
    closeDialog()

    // navigate to search page with search term
    // e.g. /search/terminator+genesis
    const term = formatSearchTerm(searchTerm)
    navigate(`/search?q=${term}`)
  }

  // waiting for 'termChange' event from SearchForm component
  const searchTermChanged = (searchTerm: string) => {
    setSearchTerm(searchTerm)
  }

  const { results, isError, isLoading } = useSearch(searchTerm)

  return (
    <>
      <SearchForm
        termChange={searchTermChanged}
        searchSubmit={handleSearchSubmit}></SearchForm>
      {isError ? (
        <AppError
          error={`Error occured while getting search results by #${searchTerm}`}
        />
      ) : isLoading ? (
        <AppSpinner visible={true} />
      ) : (
        <QuickSearchHits results={results} />
      )}
    </>
  )
}
