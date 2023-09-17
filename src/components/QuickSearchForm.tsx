import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import { QuickSearchHits } from "./QuickSearchHits";
import SvgIcon from "./SvgIcon";
import AppError from "./AppError";
import AppSpinner from "./AppSpinner";
import TMDB from "../js/tmdb-api";
import { IQuickSearchResult } from "../types/tmdb.types";
import { useSearchDialog } from "../contexts/SearchDialogContext";

export default function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hits, setHits] = useState([] as IQuickSearchResult[]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    const { hide } = useSearchDialog();
    const navigate = useNavigate();

    // waiting for 500ms after user stops typing before set new value
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        hide()
        const term = searchTerm.trim().split(' ').join('+');
        navigate(`/search/${term}`);
    }

    const clearTerm = () => setSearchTerm('');

    const getSearchResults = useCallback(async () => {
        // clear hits array to clear its UI container
        if (!searchTerm) {
            setHits([])
        };

        if (searchTerm.length > 3) {
            try {
                setIsDataLoading(true);
                const results = await TMDB.getQuickSearch(searchTerm);
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
            <form action="" className="quick-search-form" onSubmit={handleSearchSubmit}>
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
