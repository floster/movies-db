const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number
import { AVAILABLE_SEARCH_TYPES } from '../config'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDocumentTitle } from 'usehooks-ts'

import AppError from '../components/UI/AppError'
import AppSpinner from '../components/UI/AppSpinner'
import { SearchForm } from '../components/SearchForm'
import TilesGrid from '../components/TilesGrid'
import AppMessage from '../components/UI/AppMessage'

import useSearch from '../hooks/search/search'
import SearchResultsHeader from '../components/Search/SearchResultsHeader'

export default function Search() {
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
          ''
        ) : searchTermIsShort() ? (
          <AppMessage
            message={`Enter at least ${SYMBOLS_QTY_TO_SEARCH} symbols to start searching`}
          />
        ) : isError ? (
          <AppError
            error={`Error occured while searching for #${searchTerm}`}
          />
        ) : isLoading ? (
          <AppSpinner visible={true} />
        ) : (
          <>
            <SearchResultsHeader results={results} term={searchTerm} />
            {AVAILABLE_SEARCH_TYPES.map(type => {
              if (type)
                return (
                  <TilesGrid
                    key={type}
                    tiles={results[type]}
                    type={type}
                    showAll
                  />
                )
            })}
          </>
        )}
      </div>
    </>
  )
}
