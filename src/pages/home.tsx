import PageSection from '../components/Layout/PageSection'
import MediaListSection from '../components/MediaList/MediaListSection'
import TrendingsCarousel from '../components/Home/TrendingsCarousel'
import RandomMedia from '../components/Home/RandomMedia'

import { EMediaTypes, IAvailableTrendingsTypes } from '../types/tmdb.models'

const Home: React.FC = () => {
  const trendingCarouselsTypes: IAvailableTrendingsTypes[] = [
    EMediaTypes.Movie,
    EMediaTypes.Tv,
    EMediaTypes.Person,
  ]
  return (
    <>
      <div className="l-content m-main_page container">
        <MediaListSection />
        <main className="l-main_page_content">
          <PageSection extraClass="m-random_media" title="random collection">
            <RandomMedia />
          </PageSection>

          {trendingCarouselsTypes.map(type => (
            <PageSection key={type} title={`trending ${type}s`}>
              <TrendingsCarousel type={type} />
            </PageSection>
          ))}
        </main>
      </div>
    </>
  )
}

export default Home
