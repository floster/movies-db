export const AppSelectCustom = () => {
    return (
        <div className="app-select m-huge" aria-labelledby="moviesTypeSelect">
            <span className="app-select__arrow" aria-hidden="true">
                <svg className="svg-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="src/assets/sprite.svg#chevron_down" />
                </svg>
            </span>
            <select name="movies type" id="moviesTypeSelect" aria-label="current movies type">
                <option value="1" defaultChecked>now playing</option>
                <option value="2">popular</option>
                <option value="3">top rated</option>
                <option value="4">upcoming</option>
            </select>
        </div>
    )
}
