import { useState } from "react";
import SvgIcon from "./SvgIcon";
import AppSelect from "./AppSelect";
import { LOCALES } from "../js/config";

interface Props {
    openSearch: () => void;
}

export default function AppHeader({ openSearch }: Props) {
    const [locale, setLocale] = useState('en');



    return (
        <header className="app-header">
            <div className="app-header__inner container">
                <a className="app-header__logo flex" href="/" aria-label="go to homepage">
                    <SvgIcon icon="logo_light" extraClass="app-header__logo-svg" logo={true} />
                </a>
                <nav className="app-header__nav">
                    <div className="app-header__locale">
                        <AppSelect options={LOCALES} currentOption={locale} optionChanged={(locale) => setLocale(locale)} />
                    </div>
                    <button className="app-button m-icon m-secondary open-search" aria-label="open search dialog" onClick={openSearch}>
                        <SvgIcon icon="search" />
                    </button>
                    <a className="app-button m-open-favorites has-items m-icon m-primary" href="/favorites"
                        aria-label="go to favorites" data-favorites-count='12'>
                        <SvgIcon icon="fire" />
                    </a>
                </nav>
            </div>
        </header>
    )
}
