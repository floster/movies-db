const TMDB_MEDIA_BASE = import.meta.env.VITE_TMDB_MEDIA_BASE

import { useState } from 'react'
import Spinner from './Spinner'
import { EPosterSizes } from '../../types/tmdb.models'
import NoImage from './NoImage'

interface Props {
  img: string | undefined
  alt: string
  isLazy?: boolean
  isSmall?: boolean
}

const AppPicture: React.FC<Props> = ({
  img,
  alt,
  isLazy = true,
  isSmall = false,
}) => {
  if (!img) return <NoImage isSmall={isSmall} />

  const [isLoaded, setIsLoaded] = useState(true)

  const pictureLoading = () => setIsLoaded(false)

  console.log('AppPicture', img)

  return (
    <>
      <Spinner visible={isLoaded} />
      <picture className="app-picture" onLoad={pictureLoading}>
        {isSmall ? (
          <source
            srcSet={`${TMDB_MEDIA_BASE}/${EPosterSizes.w92}${img} 1x, ${TMDB_MEDIA_BASE}/${EPosterSizes.w154}${img} 2x`}
          />
        ) : (
          <source
            srcSet={`${TMDB_MEDIA_BASE}/${EPosterSizes.w342}${img} 1x, ${TMDB_MEDIA_BASE}/${EPosterSizes.w780}${img} 2x`}
          />
        )}

        <img
          className="app-picture__img"
          src={`${TMDB_MEDIA_BASE}/${EPosterSizes.w342}${img}`}
          alt={alt}
          width={280}
          height={420}
          loading={
            isLazy && import.meta.env.VITE_LAZY_LOADING === 'true'
              ? 'lazy'
              : 'eager'
          }
        />
      </picture>
    </>
  )
}

export default AppPicture
