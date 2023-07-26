import sprite from '../assets/sprite.svg';

interface Props {
    icon: string;
    extraClass?: string;
    logo?: boolean;
}

export default function SvgIcon({ icon, extraClass, logo }: Props) {
    const viewBox = logo ? '0 0 720 100' : '0 0 32 32';

    return (
        <svg className={`svg-icon ${extraClass}`} viewBox={viewBox} aria-hidden="true">
            <use href={`${sprite}#${icon}`} />
        </svg>
    )
}
