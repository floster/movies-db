export const AppFavorite = () => {
    return (
        <label className="app-favorite" aria-label="add movie to favorites">
            <input type="checkbox" name="toggleFavoriteCheckbox" id="" />
            <svg className="svg-icon m-outline" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <use href="src/assets/sprite.svg#fire" />
            </svg>
            <svg className="svg-icon m-solid" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                <use href="src/assets/sprite.svg#fire_solid" />
            </svg>
        </label>
    )
}
