import { useState } from "react";
import AppSpinner from "./AppSpinner";
import { LAZY_LOADING } from "../js/config";

interface Props {
    img: string;
    alt: string;
}

export default function AppPicture({ img, alt }: Props) {
    const [isLoaded, setIsLoaded] = useState(true);

    const pictureLoading = () => setIsLoaded(false);

    return (
        <>
            <AppSpinner visible={isLoaded} />
            <picture className="app-picture" onLoad={pictureLoading}>
                <source srcSet={img} media="(min-width: 744px)" />
                <source srcSet={img} media="(min-width: 1024px)" />
                <img
                    className="app-picture__img"
                    src={img}
                    alt={alt}
                    loading={LAZY_LOADING ? 'lazy' : 'eager'}
                />
            </picture>
        </>
    )
}
