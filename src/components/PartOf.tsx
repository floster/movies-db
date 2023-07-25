interface PartOfProps {
    title: string;
}

export default function PartOf({ title }: PartOfProps) {
    return (
        <div className="part-of">
            <span className="icon-labeled">
                <svg className="svg-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="src/assets/sprite.svg#stack" />
                </svg>
                <span className="icon-labeled__label">part of <a href="collection.html">{title}</a></span>
            </span>
        </div>
    )
}
