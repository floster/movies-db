import { useLocalStorage } from 'usehooks-ts'
import { useGetListQuery } from '../../store/tmdb/tmdb.api'
import { AVAILABLE_LIST_OPTIONS } from '../../config/dummy'
import { IAvailableListsOptions } from '../../types/tmdb.models'

import AppError from '../UI/AppError'
import AppSpinner from '../UI/AppSpinner'
import MediaListSelect from './MediaListSelect'
import MediaList from './MediaList'

export default function MediaListSection() {
  const [currentListType, setCurrentListType] = useLocalStorage(
    'currentListType',
    AVAILABLE_LIST_OPTIONS[0]
  )

  const { data, isError, isLoading } = useGetListQuery(currentListType)

  const onListTypeChange = (value: IAvailableListsOptions) => {
    setCurrentListType(value)
  }

  return isError ? (
    <AppError error={`Error occured while fetching ${currentListType}`} />
  ) : (
    <aside className="sidebar">
      <MediaListSelect
        onListTypeChange={onListTypeChange}
        currentListType={currentListType}
      />
      {isLoading ? (
        <AppSpinner visible={true} />
      ) : (
        <MediaList media={data || []} />
      )}
    </aside>
  )
}
