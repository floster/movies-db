import { FC } from 'react'
import { ISearchResults } from '../../types/tmdb.models'
import QuickSearchHitsList from './QuickSearchHitsList'
import { AVAILABLE_SEARCH_TYPES } from '../../config'

const SYMBOLS_QTY_TO_SEARCH = import.meta.env
  .VITE_SYMBOLS_QTY_TO_SEARCH as number

interface Props {
  results: ISearchResults
}

const QuickSearchHits: FC<Props> = ({ results }) => {
  const isSearchHitsEmpty = () =>
    Object.values(results).every(hits => hits === null)

  return (
    <section className="quick-search-hits">
      {isSearchHitsEmpty() ? (
        <p className="quick-search-hits__empty">
          No results. To start searching enter at least {SYMBOLS_QTY_TO_SEARCH}{' '}
          symbols
        </p>
      ) : (
        <section className="quick-search-hits__wrapper">
          {AVAILABLE_SEARCH_TYPES.map(type => (
            <QuickSearchHitsList hits={results[type]} type={type} key={type} />
          ))}
        </section>
      )}
    </section>
  )
}

export default QuickSearchHits
