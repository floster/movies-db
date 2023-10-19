import { ISearchResults } from '../../types/tmdb.models'

type searchResultsHeaderProps = {
  term: string
  results: ISearchResults
}
const SearchResultsHeader: React.FC<searchResultsHeaderProps> = ({
  term,
  results,
}) => {
  const lengths: { [key: string]: number } = {}

  Object.entries(results).forEach(
    ([type, value]) => (lengths[type] = value ? value.length : 0)
  )

  const resultsQty = Object.values(results).reduce(
    (acc, value) => acc + (value ? value.length : 0),
    0
  )

  return (
    <header>
      <h2 className="search-results-header">
        <mark>{term.replace(/\+/g, ' ')}</mark>➡<strong>{resultsQty}</strong>
        <span className="search-results-header__links">
          {Object.entries(lengths).map(([key, value]) => (
            <a
              className="search-results-header__link"
              href={`#${key}`}
              key={key}>{`${value}`}</a>
          ))}
        </span>
      </h2>
    </header>
  )
}

export default SearchResultsHeader
