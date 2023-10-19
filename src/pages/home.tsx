import AppSection from '../components/AppSection'
import AppSectionHeader from '../components/AppSectionHeader'
import MediaListSection from '../components/MediaList/MediaListSection'
import TrendingsCarousel from '../components/Home/TrendingsCarousel'
import RandomMedia from '../components/Home/RandomMedia'

import { IAvailableTrendingAndSearchMultiTypes } from '../types/tmdb.models'

const Home: React.FC = () => {
  const trendingCarouselsTypes: IAvailableTrendingAndSearchMultiTypes[] = [
    'movie',
    'tv',
    'person',
  ]
  return (
    <>
      <div className="l-content m-main_page container">
        <MediaListSection />
        <main className="l-main_page_content">
          <AppSection extraClass="m-random_media">
            <AppSectionHeader title="random collection" />
            <RandomMedia />
          </AppSection>

          {trendingCarouselsTypes.map(type => (
            <AppSection key={type}>
              <AppSectionHeader title={`trending ${type}s`} />
              <TrendingsCarousel itemsType={type} />
            </AppSection>
          ))}
        </main>
      </div>
    </>
  )
}

export default Home
