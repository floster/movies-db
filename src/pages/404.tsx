import { useDocumentTitle } from "@uidotdev/usehooks";

export default function NoMatch() {
    useDocumentTitle('404 - Movies DB');

    return (
        <div>404</div>
    )
}
