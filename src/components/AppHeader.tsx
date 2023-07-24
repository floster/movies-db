import { useState } from 'react';
import sprite from '../assets/sprite.svg';

const AppHeader = () => {
    const [counter, setCounter] = useState(0);
    function increaseCounter() {
        setCounter(counter + 1);
    }

    return (
        <header className="app-header">
            <div className="app-header__inner container">
                <a className="app-header__logo flex" href="/" aria-label="go to homepage">
                    <svg className="app-header__logo-svg" viewBox="0 0 727 97" height="20" aria-hidden="true">
                        <use href={sprite + '#logo_light'} />
                    </svg>
                </a>
                <nav className="app-header__nav">
                    <a className="app-button m-open-favorites has-items m-icon m-primary" href="/search-results.html"
                        aria-label="go to favorites" data-favorites-count={counter}>
                        <svg className="svg-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                            <use href={sprite + '#fire'} />
                        </svg>
                    </a>
                    <button className="app-button m-icon m-secondary open-search" aria-label="open search dialog" onClick={increaseCounter}>
                        <svg className="svg-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                            <use href={sprite + '#search'} />
                        </svg>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader