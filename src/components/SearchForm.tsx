import SvgIcon from "./SvgIcon";

export default function SearchForm() {
    return (
        <form action="" className="search-form ">
            <input type="text" name="" id="" className="search-form__input" placeholder="start searching..." />
            <button className="search-form__clean app-button m-close" aria-label="search" type="reset">
                <SvgIcon icon="close" />
            </button>
            <button className="search-form__submit app-button m-icon m-primary" aria-label="search" type="submit">
                <SvgIcon icon="search" />
            </button>
        </form>
    )
}
