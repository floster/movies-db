import { useState } from "react";
import AppSpinner from "./AppSpinner";

interface Props {
  img: string;
  alt: string;
  hasLoading?: boolean;
}

export default function AppPicture({ img, alt, hasLoading = true }: Props) {
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
          loading={
            hasLoading && import.meta.env.VITE_LAZY_LOADING === "true"
              ? "lazy"
              : "eager"
          }
        />
      </picture>
    </>
  );
}
