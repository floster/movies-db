import { useLocalStorage } from 'usehooks-ts'
import { useGetListQuery } from '../../store/api/tmdb.api'
import { AVAILABLE_LIST_OPTIONS } from '../../config/'
import { IAvailableListsOptions } from '../../types/tmdb.models'

import Error from '../UI/Error'
import Spinner from '../UI/Spinner'
import MediaListSelect from './MediaListSelect'
import MediaList from './MediaList'
import { useAppSelector } from '../../hooks/useRedux'

const MediaListSection: React.FC = () => {
  const [currentListType, setCurrentListType] = useLocalStorage(
    'currentListType',
    AVAILABLE_LIST_OPTIONS[0]
  )

  const locale = useAppSelector(state => state.locale.current)

  const { data, isError, isLoading } = useGetListQuery({
    option: currentListType,
    locale,
  })

  const onListTypeChange = (value: IAvailableListsOptions) => {
    setCurrentListType(value)
  }

  return isError ? (
    <Error
      error={`MediaListSection: something went wrong while fetching ${currentListType}`}
    />
  ) : (
    <aside className="sidebar">
      <MediaListSelect
        onListTypeChange={onListTypeChange}
        currentListType={currentListType}
      />
      {isLoading ? <Spinner /> : <MediaList media={data || []} />}
    </aside>
  )
}

export default MediaListSection
