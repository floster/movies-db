import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { QuickSearchHits } from "./QuickSearchHits";
import SvgIcon from "./SvgIcon";
import AppError from "./AppError";
import AppSpinner from "./AppSpinner";
import TMDB from "../js/tmdb-api";
import { ISearchResult } from "../types/tmdb.types";

export default function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hits, setHits] = useState([] as ISearchResult[]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const clearTerm = () => setSearchTerm('');

    const getSearchResults = useCallback(async () => {
        if (!searchTerm) setHits([]);

        if (searchTerm.length > 3) {
            try {
                setIsDataLoading(true);
                const results = await TMDB.search(searchTerm);
                setHits(results);
            } catch (error) {
                setIsDataError(true);
                console.error(error);
            } finally {
                setIsDataLoading(false);
            }
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            await (getSearchResults as () => Promise<void>)();
        };
        fetchData();
    }, [getSearchResults]);

    return (
        <>
            <form action="" className="quick-search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="quick-search-form__input"
                    placeholder="start searching..."
                />
                <button
                    className="quick-search-form__clean app-button m-close"
                    aria-label="search"
                    type="reset"
                    onClick={clearTerm}
                >
                    <SvgIcon icon="close" />
                </button>
                <button className="quick-search-form__submit app-button m-icon m-primary" aria-label="search" type="submit">
                    <SvgIcon icon="search" />
                </button>
            </form>
            {isDataError
                ? <AppError error={`Error occured while getting search results by #${searchTerm}`} />
                : isDataLoading
                    ? <AppSpinner visible={true} />
                    : <QuickSearchHits searchHits={hits} />
            }
        </>
    )
}
