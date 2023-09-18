import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuickSearchHits } from "./QuickSearchHits";
import AppError from "./AppError";
import AppSpinner from "./AppSpinner";
import TMDB from "../js/tmdb-api";
import { IQuickSearchResult } from "../types/tmdb.types";
import { useSearchDialog } from "../contexts/SearchDialogContext";
import { SearchForm } from "./SearchForm";

const SYMBOLS_QTY_TO_SEARCH = import.meta.env.VITE_SYMBOLS_QTY_TO_SEARCH as number;

export default function QuickSearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [hits, setHits] = useState([] as IQuickSearchResult[]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    // described in src/contexts/SearchDialogContext.tsx
    const { hide } = useSearchDialog();
    const navigate = useNavigate();

    const handleSearchSubmit = (searchTerm: string) => {
        // hide search dialog
        hide()
        // make search term URL-friendly and looks like "search/rambo+first+blood"
        const term = searchTerm.trim().split(' ').join('+');
        navigate(`/search/${term}`);
    }

    // waiting for 'termChange' event from SearchForm component
    const searchTermChanged = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    const getSearchResults = useCallback(async () => {
        // clear hits array to clear Quick Search Hits container
        // if search term is empty or less than 4 symbols
        if (!searchTerm || searchTerm.length < SYMBOLS_QTY_TO_SEARCH) {
            setHits([])
        };

        if (searchTerm.length >= SYMBOLS_QTY_TO_SEARCH) {
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
    }, [searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            await (getSearchResults as () => Promise<void>)();
        };
        fetchData();
    }, [getSearchResults]);

    return (
        <>
            <SearchForm
                termChange={searchTermChanged}
                searchSubmit={handleSearchSubmit}
            ></SearchForm>
            {isDataError
                ? <AppError error={`Error occured while getting search results by #${searchTerm}`} />
                : isDataLoading
                    ? <AppSpinner visible={true} />
                    : <QuickSearchHits searchHits={hits} />
            }
        </>
    )
}
