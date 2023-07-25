import SvgIcon from "./SvgIcon";

interface PartOfProps {
    title: string;
}

export default function PartOf({ title }: PartOfProps) {
    return (
        <div className="part-of">
            <span className="icon-labeled">
                <SvgIcon icon="stack" />
                <span className="icon-labeled__label">part of <a href="collection.html">{title}</a></span>
            </span>
        </div>
    )
}
