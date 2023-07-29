interface Props {
    img: string;
    alt: string;
}

export default function AppPicture({ img, alt }: Props) {
    return (
        <picture className="app-picture">
            <source srcSet={img} media="(min-width: 744px)" />
            <source srcSet={img} media="(min-width: 1024px)" />
            <img className="app-picture__img" src={img} alt={alt} />
        </picture>

    )
}
