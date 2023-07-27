interface Props {
    img: string;
    alt: string;
}

export default function AppPicture({ img, alt }: Props) {
    return (
        <picture className="media-hero__picture">
            <source srcSet={img} media="(min-width: 744px)" />
            <source srcSet={img} media="(min-width: 1024px)" />
            <img className="media-hero__img" src={img} alt={alt} />
        </picture>

    )
}
