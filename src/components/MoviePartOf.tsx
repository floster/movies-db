import { Belonging } from "../js/types";
import SvgIcon from "./SvgIcon";

interface Props {
    data: Belonging | null;
}

export default function PartOf({ data }: Props) {
    return (
        <>
            {data && (
                <div className="part-of">
                    <span className="icon-labeled">
                        <SvgIcon icon="stack" />
                        <span className="icon-labeled__label">part of <a href={`/collection/${data.id}`}>{data.name}</a></span>
                    </span>
                </div>
            )}
        </>
    )
}
