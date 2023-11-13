import useMatchMedia from '../../hooks/matchMedia'

type Props = {
  path: string
}

const MediaHeroBackground: React.FC<Props> = ({ path }) => {
  const { isDesktop } = useMatchMedia()

  if (!path) return <div className="media-hero__background"></div>

  return isDesktop ? (
    <picture className="media-hero__background">
      <source
        srcSet={`https://image.tmdb.org/t/p/original${path}`}
        media="(min-width: 1920px)"
      />
      <source
        srcSet={`https://image.tmdb.org/t/p/w1280${path}`}
        media="(min-width: 1280px)"
      />
      <source
        srcSet={`https://image.tmdb.org/t/p/w780${path}`}
        media="(min-width: 744px)"
      />
      <img src={`https://image.tmdb.org/t/p/w300${path}`} />
    </picture>
  ) : (
    <div className="media-hero__background"></div>
  )
}

export default MediaHeroBackground
