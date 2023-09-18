import { FC, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import SvgIcon from "./SvgIcon";

// The delay time in milliseconds. After this amount of time, the latest value is used.
const DEBOUNCE_DELAY = 500;

type SearchFormProps = {
    searchSubmit: (searchTerm: string) => void;
    termChange?: (searchTerm: string) => void;
}

export const SearchForm: FC<SearchFormProps> = ({ searchSubmit, termChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // The debounced value. After the DEBOUNCE_DELAY ms has passed without the value changing,
    // this will be updated to the latest value.
    const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY)

    const handleReset = () => setSearchTerm('');

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setSearchTerm('');
        searchSubmit(formData.get('search') as string);
    }

    // call (emit) searchSubmit function when debouncedSearchTerm changes
    // (In fact, it will happen in DEBOUNCE_DELAY ms)
    useEffect(() => {
        if (termChange) {
            termChange(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm, termChange])

    return (
        <form action="" className="quick-search-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleChange}
                className="quick-search-form__input"
                placeholder="start searching..."
            />
            <button
                className="quick-search-form__clean app-button m-close"
                aria-label="search"
                type="reset"
                onClick={handleReset}
            >
                <SvgIcon icon="close" />
            </button>
            <button className="quick-search-form__submit app-button m-icon m-primary" aria-label="search" type="submit">
                <SvgIcon icon="search" />
            </button>
        </form>
    )
}