interface Props {
    error: string;
}

export default function AppError({ error }: Props) {
    return (
        <span className="app-error">☠️⚠️{error}</span>
    )
}