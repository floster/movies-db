import AppSelect from './AppSelect'

interface Props {
    title: string;
    hasSelect?: boolean;
    alignStart?: boolean;
}

export default function AppSectionHeader({ title, hasSelect, alignStart }: Props) {
    return (
        <header className={`app-section__header ${alignStart ? 'm-align_start' : ''}`}>
            <h2 className="app-section__title">{title}</h2>
            {hasSelect && <AppSelect />}
        </header>
    )
}
