import { useState } from 'react';
import './app.scss'
import AppHeader from './components/AppHeader';
import { AppSection } from './components/AppSection';
import { MainPageSidebar } from './components/MainPageSidebar';
import data from './data.json'
import AppSectionHeader from './components/AppSectionHeader';
import MediaHero from './components/MediaHero';

function App() {
  const [movies] = useState(data.parts);
  const [heroRandom] = useState(data.hero.random);

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

        </main>
      </div>
    </>
  )
}

export default App
