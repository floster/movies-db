interface Props {
    value: number;
}

export default function AppProgress({ value }: Props) {
    const wholeValue = value * 10;

    return (
        <div className="app-progress" style={{ "--value": wholeValue } as React.CSSProperties} role="progressbar" aria-valuenow={wholeValue}
            aria-valuemin={0} aria-valuemax={100} aria-label={`The Fast and the Furious Collection rating is + ${value}`}>
            {value}</div>
    )
}
