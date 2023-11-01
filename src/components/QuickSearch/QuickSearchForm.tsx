import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { formatSearchTerm } from '../../utils/formatters'

import Error from '../UI/Error'
import Spinner from '../UI/Spinner'
import SearchForm from '../SearchForm'
import QuickSearchHits from './QuickSearchHits'

import useSearch from '../../hooks/search/search'
import { useAppActions } from '../../hooks/useRedux'

const QuickSearchForm: React.FC = () => {
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
        <Error
          error={`QuickSearchForm: something went wrong while getting search results for #${searchTerm}`}
        />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <QuickSearchHits results={results} />
      )}
    </>
  )
}

export default QuickSearchForm
