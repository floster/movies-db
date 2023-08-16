import AppSelectCustom from './AppSelectCustom'
import MediaList from './MediaList'
import { useCallback, useEffect, useState } from 'react'
import tmdb from '../js/tmdb-api'
import { MOVIE_LIST_OPTIONS } from '../js/config'
import { UListTypes, ITileData, UListSortOptions } from '../types/tmdb.types'
import { formatTilesData } from '../js/formaters'

export default function MainPageSidebar() {
    const [currentListType, setCurrentListType] = useState<UListSortOptions>(MOVIE_LIST_OPTIONS[0].value);
    const [list, setList] = useState<ITileData[]>([]);

    const getList = useCallback(async () => {
        const mediaType = currentListType.split('__')[0] as 'movie' | 'tv';
        const listType = currentListType.split('__')[1] as UListTypes;

        const listData = await tmdb.getList(1, mediaType, listType);
        setList(formatTilesData(listData.media, listData.media_type, 'released', false, true));
    }, [currentListType])

    useEffect(() => {
        async function fetchData() {
            await getList();
        }
        fetchData();
    }, [getList]);

    const onListTypeChange = (value: UListSortOptions) => setCurrentListType(value);

    return (
        <aside className="sidebar">
            <AppSelectCustom onListTypeChange={onListTypeChange} currentListType={currentListType} />
            <MediaList media={list} />
        </aside>
    )
}
