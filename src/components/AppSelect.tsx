import { SORT_OPTIONS } from "../js/config"
import { SortOptionsValues } from "../js/types";

interface Props {
    currentSortOption: SortOptionsValues;
    onSortChange: (option: SortOptionsValues) => void;
}

export default function AppSelect({ currentSortOption, onSortChange }: Props) {
    return (
        <div className="app-select">
            <label htmlFor="sortParts" className="app-select__label">Sort by:</label>
            <select name="sortParts" id="sortParts" value={currentSortOption} onChange={e => onSortChange(e.target.value as SortOptionsValues)}>
                {SORT_OPTIONS.map((option) => (
                    <option
                        value={option.value}
                        key={option.value}
                    >
                        {option.title}
                    </option>)
                )}
            </select>
        </div>
    )
}
