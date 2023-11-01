const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number
import { AVAILABLE_SEARCH_TYPES } from '../config'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import Error from '../components/UI/Error'
import Spinner from '../components/UI/Spinner'
import SearchForm from '../components/SearchForm'
import TilesGrid from '../components/Layout/TilesGrid'
import Message from '../components/UI/Message'

import useSearch from '../hooks/search/search'
import SearchResultsHeader from '../components/Search/SearchResultsHeader'
import { ESortValues } from '../types/tmdb.models'

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // reading/writing search params via URLSearchParams interface
  const [searchParams, setSearchParams] = useSearchParams()

  // set document title
  const title = searchTerm ? `searching '${searchTerm}'` : 'search'
  useDocumentTitle(`${title} - Movies DB`)

  const { results, isError, isLoading } = useSearch(searchTerm)

  const searchTermIsShort = () => searchTerm.length < SYMBOLS_QTY_TO_SEARCH

  // set search term that comes from URLSearchParams: ?q=term into State
  useEffect(() => setSearchTerm(searchParams.get('q') || ''), [searchParams])

  const handleSearchSubmit = (searchTerm: string) => {
    // set search term that comes from SearchForm to URLSearchParams: ?q=term
    setSearchParams({ q: searchTerm } || {})
  }

  return (
    <>
      <section className="container search-form">
        <SearchForm searchSubmit={handleSearchSubmit} />
      </section>
      <div className="l-content container search-results">
        {searchTerm.length === 0 ? (
          <Message
            message={`No results... Try to search for something above ⤴`}
          />
        ) : searchTermIsShort() ? (
          <Message
            message={`Enter at least ${SYMBOLS_QTY_TO_SEARCH} symbols to start searching`}
          />
        ) : isError ? (
          <Error error={`Error occured while searching for #${searchTerm}`} />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <>
            <SearchResultsHeader results={results} term={searchTerm} />
            {AVAILABLE_SEARCH_TYPES.map(
              type =>
                results[type] && (
                  <TilesGrid
                    key={type}
                    tiles={results[type]}
                    type={type}
                    hasSort={true}
                    defaultSort={ESortValues.RatingDesc}
                    showAll
                  />
                )
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Search
