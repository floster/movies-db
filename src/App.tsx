import { useState } from 'react';
import './app.scss'
import AppHeader from './components/AppHeader';
import { AppSection } from './components/AppSection';
import { MainPageSidebar } from './components/MainPageSidebar';
import data from './data.json'
import AppSectionHeader from './components/AppSectionHeader';
import MediaHero from './components/MediaHero';
import AppCarousel from './components/AppCarousel';

function App() {
  const [movies] = useState(data.parts);
  const [heroRandom] = useState(data.hero.random);
  const [trandingMovies] = useState(data.tranding_movies);
  const [trandingShows] = useState(data.tranding_shows);

  return (
    <>
      <AppHeader />
      <div className="l-content m-main_page container">
        <MainPageSidebar movies={movies} />
        <main className="l-main_page_content">
          <AppSection>
            <AppSectionHeader title="random collection" hasSelect={false} />
            <MediaHero data={heroRandom} isRandom={true} />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending movies" hasSelect={false} />
            <AppCarousel items={trandingMovies} />
          </AppSection>

          <AppSection>
            <AppSectionHeader title="trending TV shows" hasSelect={false} />
            <AppCarousel items={trandingShows} />
          </AppSection>
        </main>
      </div>
    </>
  )
}

export default App
