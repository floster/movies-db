import AppSelectCustom from './AppSelectCustom'
import MediaList from './MediaList'
import { useCallback, useEffect, useState } from 'react'
import tmdb from '../js/tmdb-api'
import { MOVIE_LIST_OPTIONS } from '../js/config'
import { UTListTypes, ITileData, UTListSortOptions } from '../types/tmdb.types'
import { formatTilesData } from '../js/formatters'
import AppError from './AppError'
import AppSpinner from './AppSpinner'

export default function MainPageSidebar() {
    const getListType = (): UTListSortOptions => {
        const listType = localStorage.getItem('listType') || MOVIE_LIST_OPTIONS[0].value;
        return listType as UTListSortOptions;
    }

    const [currentListType, setCurrentListType] = useState<UTListSortOptions>(getListType());
    const [list, setList] = useState<ITileData[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    const onListTypeChange = (value: UTListSortOptions) => {
        localStorage.setItem('listType', value);
        setCurrentListType(value)
    };

    const getList = useCallback(async () => {
        try {
            const mediaType = currentListType.split('__')[0] as 'movie' | 'tv';
            const listType = currentListType.split('__')[1] as UTListTypes;

            const listData = await tmdb.getList(1, mediaType, listType);
            setList(formatTilesData(listData.media, listData.media_type, 'released', false, true));
        } catch (error) {
            setIsDataError(true);
            console.error(error);
        } finally {
            setIsDataLoading(false);
        }
    }, [currentListType])

    useEffect(() => {
        async function fetchData() {
            await getList();
        }
        fetchData();
    }, [getList]);

    return (
        isDataError
            ? <AppError error={`Error occured while fetching ${currentListType}`} />
            : <aside className="sidebar">
                <AppSelectCustom onListTypeChange={onListTypeChange} currentListType={currentListType} />
                {isDataLoading
                    ? <AppSpinner visible={true} />
                    : <MediaList media={list} />
                }
            </aside>
    )
}
