interface AppPictureProps {
    img: string;
    alt: string;
}

export default function AppPicture({ img, alt }: AppPictureProps) {
    return (
        <picture className="media-hero__picture">
            <source srcSet={`./src/assets/${img}.png`} media="(min-width: 744px)" />
            <source srcSet={`./src/assets/${img}.png`} media="(min-width: 1024px)" />
            <img className="media-hero__img" src={`./src/assets/${img}.png`} alt={alt} />
        </picture>

    )
}
