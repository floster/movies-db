export default function AppSelect() {
    return (
        <div className="app-select">
            <label htmlFor="sortParts" className="app-select__label">Sort by:</label>
            <select name="sortParts" id="sortParts">
                <option value="date_asc" defaultChecked>Date 0-9</option>
                <option value="date_desc">Date 9-0</option>
                <option value="title_asc">Title 0-9</option>
                <option value="title_desc">Title 9-0</option>
            </select>
        </div>
    )
}
