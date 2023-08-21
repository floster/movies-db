import { useEffect, useRef } from "react";
import { useSearchDialog } from "../contexts/SearchDialogContext";

interface Props {
    children: React.ReactNode;
}

export default function AppDialog({ children }: Props) {
    const ref = useRef<HTMLDialogElement>(null);

    const { visible, toggle } = useSearchDialog();

    const dialogOnClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const target = e.target as HTMLElement;
        if (target.nodeName === 'DIALOG') {
            toggle();
        }
    }

    useEffect(() => {
        if (visible) {
            ref.current?.showModal();
            document.body.classList.add("modal-open"); // prevent bg scroll
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [visible]);

    return (
        <dialog className="app-dialog search-dialog" ref={ref} onClick={dialogOnClick} >
            {children}
        </dialog>
    )
}
