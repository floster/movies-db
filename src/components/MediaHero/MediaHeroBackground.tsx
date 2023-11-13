const TMDB_MEDIA_BASE = import.meta.env.VITE_TMDB_MEDIA_BASE

import useMatchMedia from '../../hooks/matchMedia'
import { EBackdropSizes } from '../../types/tmdb.models'

type Props = {
  path: string
}

const MediaHeroBackground: React.FC<Props> = ({ path }) => {
  const { isDesktop } = useMatchMedia()

  if (!path) return <div className="media-hero__background"></div>

  return isDesktop ? (
    <picture className="media-hero__background">
      <source
        srcSet={`${TMDB_MEDIA_BASE}/${EBackdropSizes.original}${path}`}
        media="(min-width: 1920px)"
      />
      <source
        srcSet={`${TMDB_MEDIA_BASE}/${EBackdropSizes.w1280}${path}`}
        media="(min-width: 1280px)"
      />
      <source
        srcSet={`${TMDB_MEDIA_BASE}/${EBackdropSizes.w780}${path}`}
        media="(min-width: 744px)"
      />
      <img src={`${TMDB_MEDIA_BASE}/${EBackdropSizes.w300}${path}`} />
    </picture>
  ) : (
    <div className="media-hero__background"></div>
  )
}

export default MediaHeroBackground
