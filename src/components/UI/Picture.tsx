import { useState } from 'react'
import AppSpinner from './Spinner'

interface Props {
  img: string
  alt: string
  hasLoading?: boolean
}

const Picture: React.FC<Props> = ({ img, alt, hasLoading = true }) => {
  const [isLoaded, setIsLoaded] = useState(true)

  const pictureLoading = () => setIsLoaded(false)

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
            hasLoading && import.meta.env.VITE_LAZY_LOADING === 'true'
              ? 'lazy'
              : 'eager'
          }
        />
      </picture>
    </>
  )
}

export default Picture
