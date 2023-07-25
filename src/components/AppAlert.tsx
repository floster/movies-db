import { useEffect, useRef } from "react";
import SvgIcon from "./SvgIcon";

type Props = {
    isOpened: boolean;
    onClose: () => void;
    text: string;
    action: string;
}

export default function AppAlert({ text, action, isOpened, onClose }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    }

    useEffect(() => {
        if (isOpened) {
            ref.current?.classList.remove('is-closed');
            ref.current?.classList.add('is-opened');

            setTimeout(() => {
                onClose();
            }, 3000);
        } else {
            ref.current?.classList.remove('is-opened');
            ref.current?.classList.add('is-closed');
        }
    }, [isOpened, onClose]);

    return (
        <div className="app-alert m-info is-closed" role="alert" ref={ref}>
            <button className="app-alert__close app-button m-close" aria-label="Close alert" onClick={e => onCloseClick(e)}>
                <SvgIcon icon="close" />
            </button>
            <p className="app-alert__message">
                <strong>{text}</strong>
                {action}
                <SvgIcon icon="fire_solid" />
            </p>
        </div>
    )
}
