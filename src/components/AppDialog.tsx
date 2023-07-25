import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;
    isOpened: boolean;
    onClose: () => void;
}

export const AppDialog = ({ children, isOpened, onClose }: Props) => {
    const ref = useRef<HTMLDialogElement>(null);

    const dialogOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const target = e.target as HTMLElement;
        if (target.nodeName === 'DIALOG') {
            onClose();
        }
    }

    useEffect(() => {
        if (isOpened) {
            ref.current?.showModal();
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpened]);

    return (
        <dialog className="app-dialog search-dialog" ref={ref} onClick={dialogOnClick} >
            {children}
        </dialog>
    )
}
