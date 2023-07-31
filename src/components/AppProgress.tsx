interface Props {
    value: string;
}

export default function AppProgress({ value }: Props) {
    let label = '';
    let wholeValue = null;

    if (!value) {
        label = 'nr';
        wholeValue = 0;
    } else {
        label = value;
        wholeValue = +value * 10;
    }

    return (
        <div className="app-progress" style={{ "--value": wholeValue } as React.CSSProperties} role="progressbar" aria-valuenow={wholeValue}
            aria-valuemin={0} aria-valuemax={100} aria-label={`The Fast and the Furious Collection rating is + ${label}`}>
            {label}</div>
    )
}
