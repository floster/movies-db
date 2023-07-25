import AppSelect from './AppSelect'

interface AppSectionHeaderProps {
    title: string;
    hasSelect: boolean;
}

export default function AppSectionHeader(props: AppSectionHeaderProps) {
    return (
        <header className="app-section__header m-align_right">
            <h2 className="app-section__title">{props.title}</h2>
            {props.hasSelect && <AppSelect />}
        </header>
    )
}
