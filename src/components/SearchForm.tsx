import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import SvgIcon from './UI/SvgIcon'
import { DEBOUNCE_DELAY } from '../config'

type Props = {
  searchSubmit: (searchTerm: string) => void
  termChange?: (searchTerm: string) => void
}

const SearchForm: React.FC<Props> = ({ searchSubmit, termChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null as HTMLInputElement | null)

  // The debounced value. After the DEBOUNCE_DELAY ms has passed without the value changing,
  // this will be updated to the latest value.
  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)

  const handleReset = () => {
    setSearchTerm('')
    searchInputRef.current?.focus()
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setSearchTerm('')
    searchSubmit(formData.get('search') as string)
  }

  // call (emit) searchSubmit function when debouncedSearchTerm changes
  // (In fact, it will happen in DEBOUNCE_DELAY ms)
  useEffect(() => {
    if (termChange) {
      termChange(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, termChange])

  return (
    <form action="" className="quick-search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        ref={searchInputRef}
        id="mainSearchInput"
        value={searchTerm}
        onChange={handleChange}
        className="quick-search-form__input"
        placeholder="start searching..."
        minLength={4}
      />
      <button
        className="quick-search-form__clean button m-icon"
        aria-label="search"
        type="reset"
        onClick={handleReset}>
        <SvgIcon icon="close" />
      </button>
      <button
        className="quick-search-form__submit button m-icon m-primary"
        aria-label="search"
        type="submit">
        <SvgIcon icon="search" />
      </button>
    </form>
  )
}

export default SearchForm
