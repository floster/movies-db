import { USortOptionValues } from '../types/tmdb.types';
import AppSelect from './AppSelect'

interface Props {
    title: string;
    hasSelect?: boolean;
    currentSortOption?: USortOptionValues;
    onSortChange?: (option: USortOptionValues) => void;
    alignStart?: boolean;
}

export default function AppSectionHeader({ title, hasSelect, alignStart, currentSortOption, onSortChange }: Props) {
    return (
        <header className={`app-section__header ${alignStart ? 'm-align_start' : ''}`}>
            <h2 className="app-section__title">{title}</h2>
            {hasSelect && <AppSelect currentSortOption={currentSortOption!} onSortChange={onSortChange!} />}
        </header>
    )
}
